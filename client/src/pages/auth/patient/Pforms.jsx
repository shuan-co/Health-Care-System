import React from 'react'

export default function Pforms() {
  return (
    <form id='patientForm'>
      <p>General Information</p>
      <input id='firstname' name='firstname' placeholder='First name' type='text'/><br />
      <input id='middlename' name='middlename' placeholder='Middle name' type='text'/><br />
      <input id='lastname' name='lastname' placeholder='Last name' type='text'/><br />
      <label for='dateOfBirth'>Date of Birth</label><br />
      <input id='dateOfBirth' name='dateOfBirth' type='date'/><br />
      <input id='male' name='sex' type='radio'/>
      <label for='male'>Male</label>
      <input id='female' name='sex' type='radio'/>
      <label for='female'>Female</label><br /><br />

      <p>Contact Information</p>
      <input id='address1' name='address1' placeholder='Address Line 1' type='text'/><br />
      <input id='address2' name='address2' placeholder='Address Line 2' type='text'/><br />
      <input id='phonenumber' name='phonenumber' placeholder='Phone number' type='text'/><br /><br/>

      <p>Emergency Contact Person</p>
      <input id='contactname' name='contactname' placeholder='Name' type='text'/><br />
      <input id='contactphonenumber' name='contactphonenumber' placeholder='Phone number' type='text'/><br /><br />

      <p>Insurance Information</p>
      <input id='insuranceprovider' name='insuranceprovider' placeholder='Insurance Provider' type='text'/><br />
      <input id='policynumber' name='policynumber' placeholder='Policy number' type='number'/><br />
      <input id='groupnumber' name='groupnumber' placeholder='Group number' type='number'/><br /><br />

      <p>Medical History</p>
      <textarea id='medicalhistory' name='medicalhistory' rows={3} cols={30}></textarea><br />

      <p>Current Medications</p>
      <textarea id='medications' name='medications' rows={3} cols={30}></textarea><br />

      <p>Allergies</p>
      <textarea id='allergies' name='allergies' rows={3} cols={30}></textarea><br />

      <p>Family medical history</p>
      <textarea id='familymedhistory' name='familymedhistory' rows={3} cols={30}></textarea><br />

      <p>Occupation</p>
      <input id='occupation' name='occupation' placeholder='Occupation' type='text'/>
    </form>
  )
}
