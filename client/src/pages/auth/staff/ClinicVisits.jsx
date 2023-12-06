import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db, config } from '../../../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

export default function ClinicVisits(props) {
  const [clinic, setClinic] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [showFullData, setShowFullData] = useState(false);
  const [index, setIndex] = useState(0);
  const [patientsUID, setPatientsUID] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableDiagnosis, setEditableDiagnosis] = useState({});
  const [clinicName, setClinicName] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedUID, setSelectedUID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
        try {
          // get the clinic name of the staff
          const docRef = doc(db, 'clinicStaffs', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log('Document data:', docSnap.data().clinicName);
            setClinic(docSnap.data().clinicName);
            setClinicName(docSnap.data().clinicName);
          } else {
            console.log('No such document!');
          }

          // Check if clinic has a value before proceeding
          if (clinic) {
            const querySnapshot = await getDocs(collection(db, clinic, 'patients', 'patientlist'));
            const patientUIDs = [];
            querySnapshot.forEach((doc) => {
              patientUIDs.push(doc.id);
            });
            setPatientsUID(patientUIDs);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }

    fetchData();
  }, [clinic]); // Added clinic as a dependency for useEffect

  // Use another useEffect to listen to changes in patientsUID and trigger diagnoses retrieval
  useEffect(() => {
    console.log(patientsUID.length);
    if (patientsUID.length > 0) {
      const fetchDiagnoses = async () => {
        const diagnosesArray = [];
        console.log('im in');
        for (let i = 0; i < patientsUID.length; i++) {
          const querySnapshot = await getDocs(
            collection(db, clinic, 'patients', 'patientlist', patientsUID[i], 'diagnoses')
          );
          querySnapshot.forEach((doc) => {
            // Assuming doc.data() is a dictionary
            const data = doc.data();

            // Add doc.id to the dictionary
            data.id = doc.id;
            data.uid = patientsUID[i];

            // Now, data includes both the original key-value pairs from doc.data() and the id
            diagnosesArray.push(data);

            // Logging for verification
            console.log(data);
          });
        }
        setDiagnoses(diagnosesArray);
      };

      fetchDiagnoses();
    }
  }, [patientsUID, clinic]);

  // Filter diagnoses based on the search term
  const filteredDiagnoses = diagnoses.filter((diagnosis) =>
   diagnosis.Name && diagnosis.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function showForm(index) {
    setShowFullData(true);
    setIndex(index);
    setEditableDiagnosis(diagnoses[index]);
  }

  function handleInputChange(e) {
    setEditableDiagnosis({
      ...editableDiagnosis,
      [e.target.name]: e.target.value,
    });
  }

  const [currentUID, setCurrentUID] = useState(null);
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Update the clinicPatient document
    // Update the document in the diagnoses collection
    await setDoc(doc(config.firestore, clinicName, "patients", "patientlist", selectedUID, "diagnoses", selectedKey), {
      Temperature: editableDiagnosis.Temperature,
      BP: editableDiagnosis.BP,
      Assessment: editableDiagnosis.Assessment,
      Treatment: editableDiagnosis.Treatment,
      ChiefComplaint: editableDiagnosis.ChiefComplaint,
      Disposition: editableDiagnosis.Disposition,
      LastMensDate: editableDiagnosis.LastMensDate,
      RespiratoryRate: editableDiagnosis.RespiratoryRate,
      Height: editableDiagnosis.Height,
      Weight: editableDiagnosis.Weight,
      HeartRate: editableDiagnosis.HeartRate,
      VisitDate: editableDiagnosis.VisitDate,
      FollowUpDate: editableDiagnosis.FollowUpDate,
      ProviderNotes: editableDiagnosis.ProviderNotes,
      Clinic: clinicName,
      Name: editableDiagnosis.Name
    });
        console.log(selectedKey);
  };
  
  


  return (
    <div className='w-screen p-12'>
      <div className='space-y-2 mb-8'>
        <h1 className='lato text-2xl'>SEARCH RECORDS</h1>
        <input
          type='text'
          className='border border-black rounded-lg w-2/4 h-8 p-2'
          placeholder='Search by Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <div className='ms-3 inline'>
          <button>{searchIcon}</button>
        </div>
      </div>

      <div className='relative w-full lato'>
        <div className='grid grid-cols-6 bg-blue-800 rounded-t-lg text-white exo text-center p-3'>
          <h1>ENTRY</h1>
          <h1>NAME</h1>
          <h1>DATE</h1>
          <h1>CHIEF COMPLAINT</h1>
          <h1>CLINIC</h1>
          <h1>OUTPATIENT FORM</h1>
        </div>

        <div className='bg-slate-100 rounded-b-lg'>
          {filteredDiagnoses.map((diagnosis, index) => (
            <div className='grid grid-cols-6 text-center p-4 border border-black' key={index}>
              <h3 className='font-bold'>{index}</h3>
              <h3 className='capitalize'>{diagnosis.Name}</h3>
              <h3 className='border bg-purple-200 rounded-2xl'>{diagnosis.VisitDate}</h3>
              <h3 className='capitalize'>{diagnosis.ChiefComplaint}</h3>
              <h3 className='capitalize'>{diagnosis.Clinic}</h3>
              <button
                  onClick={() => {
                    showForm(index);
                    setSelectedUID(diagnosis.uid)
                    setSelectedKey(diagnosis.id);
                  }}
                className='hover:bg-slate-200 rounded-lg border border-black enriqueta'
              >
                View Form
              </button>
            </div>
          ))}
          <div className='w-full h-10'></div>
        </div>
      </div>

          {showFullData && (
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div className="relative w-full max-w-2xl max-h-full mx-auto lato">
                      <div className="flex items-start justify-between p-4 border-b rounded-t bg-blue-800">
                          <h3 className="p-2 text-xl font-semibold text-white-900 dark:text-white">
                              Diagnosis
                          </h3>
                          <button
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-50 dark:hover:text-black"
                              onClick={() => setShowFullData(false)}
                          >
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>

                      <div className="relative bg-white shadow shadow-2xl drop-shadow-2xl border border-black exo">
                          <div>
                              <button className='ms-6 mt-5 underline underline-offset-4 hover:text-blue-600' onClick={() => navigate('./patientlist')}>Check Patient's Personal Information</button>
                          </div>
                          <div className='p-6 grid grid-cols-2'>
                              <h3 className='font-bold'>Clinic</h3>
                              <p className='capitalize'>{diagnoses[index].Clinic}</p>
                              <h3 className='font-bold'>Name</h3>
                              <p className='capitalize'>{diagnoses[index].Name}</p>
                              <h3 className='font-bold'>Chief Complaint</h3>
                              <input
                              name="ChiefComplaint"
                              value={editableDiagnosis.ChiefComplaint}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Assessment</h3>
                              <input
                              name="Assessment"
                              value={editableDiagnosis.Assessment}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Date</h3>
                              <input
                              name="VisitDate"
                              value={editableDiagnosis.VisitDate}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Follow Up Date</h3>
                              <input
                              name="FollowUpDate"
                              value={editableDiagnosis.FollowUpDate}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Disposition</h3>
                              <input
                              name="Disposition"
                              value={editableDiagnosis.Disposition}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Treatment</h3>
                              <input
                              name="Treatment"
                              value={editableDiagnosis.Treatment}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Blood Pressure</h3>
                              <input
                              name="BP"
                              value={editableDiagnosis.BP}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Heart Rate</h3>
                              <input
                              name="HeartRate"
                              value={editableDiagnosis.HeartRate}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Respiratory Rate</h3>
                              <input
                              name="RespiratoryRate"
                              value={editableDiagnosis.RespiratoryRate}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Height</h3>
                              <input
                              name="Height"
                              value={editableDiagnosis.Height}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Weight</h3>
                              <input
                              name="Weight"
                              value={editableDiagnosis.Weight}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Last Menstration Date</h3>
                              <input
                              name="LastMensDate"
                              value={editableDiagnosis.LastMensDate}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Temperature</h3>
                              <input
                              name="Temperature"
                              value={editableDiagnosis.Temperature}
                              onChange={handleInputChange}
                              />
                              <h3 className='font-bold'>Notes:</h3>
                              <input
                              name="ProviderNotes"
                              value={editableDiagnosis.ProviderNotes}
                              onChange={handleInputChange}
                              />
                          </div>
                          <div className="inline">
                            <button
                              className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"                              type='button'
                              onClick={handleUpdate}
                              style={{marginLeft: '30vw', marginBottom: '5vh', width: '100px', height: '55px'}}
                            >
                              Update
                            </button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
    </div>
  );
}
