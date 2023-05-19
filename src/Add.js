import React, { useState } from 'react'
// import './design.css'

const Add = () => {
       const [isOpen, setOpen] = useState(false)
       const [skillsOptions, setSkillsOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
       const [skillsSelectedOption, setSkillsSelectedOption] = useState('');
       const [skillsEditMode, setSkillsEditMode] = useState(false);

       const [domainsOptions, setDomainsOptions] = useState(['Domain 1', 'Domain 2', 'Domain 3']);
       const [domainsSelectedOption, setDomainsSelectedOption] = useState('');
       const [domainsEditMode, setDomainsEditMode] = useState(false);

       // const Domains =['FrondEnd','BackEnd','Fullstack'];

       const handleClick = () => {
              setOpen(!isOpen);
       }
       const handleSubmit = (e) => {
              e.preventDefault();
       };

       const handleSkillsOptionChange = (e) => {
              setSkillsSelectedOption(e.target.value);
       };

       const handleDomainsOptionChange = (e) => {
              setDomainsSelectedOption(e.target.value);
       };

       const toggleSkillsEditMode = () => {
              setSkillsEditMode(!skillsEditMode);
       };

       const toggleDomainsEditMode = () => {
              setDomainsEditMode(!domainsEditMode);
       };

       const handleSkillsSave = () => {
              if (skillsSelectedOption.trim() !== '') {
                     const updatedOptions = [...skillsOptions];
                     updatedOptions.push(skillsSelectedOption);
                     setSkillsOptions(updatedOptions);
                     setSkillsSelectedOption('');
              }
              setSkillsEditMode(false);
       };

       const handleDomainsSave = () => {
              if (domainsSelectedOption.trim() !== '') {
                     const updatedOptions = [...domainsOptions];
                     updatedOptions.push(domainsSelectedOption);
                     setDomainsOptions(updatedOptions);
                     setDomainsSelectedOption('');
              }
              setDomainsEditMode(false);
       };
       return (
              <div>
                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            ADD
                     </button>

                     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                   <div className="modal-content">
                                          <div class="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">ADD DETAILS</h5>
                                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                 </button>
                                          </div>
                                          <div className="modal-body">
                                                 <h6>Skills</h6>
                                                 {skillsEditMode ? (
                                                        <div>
                                                               <input className='input'
                                                                      type="text"
                                                                      value={skillsSelectedOption}
                                                                      onChange={handleSkillsOptionChange}
                                                               />
                                                               <button className='savebt' onClick={handleSkillsSave}>Save</button>
                                                        </div>
                                                 ) : (
                                                        <div>
                                                               <select className='opt1' value={skillsSelectedOption} onChange={handleSkillsOptionChange}>
                                                                      {skillsOptions.map((option) => (
                                                                             <option key={option} value={option}>
                                                                                    {option}
                                                                             </option>
                                                                      ))}
                                                               </select>
                                                               <button className='btedit' onClick={toggleSkillsEditMode}>Edit</button>
                                                        </div>
                                                 )}
                                          </div>

                                          <div className="modal-body2">
                                                 <h6>Domains</h6>
                                                 {domainsEditMode ? (
                                                        <div>
                                                               <input className='inputbox'
                                                                      type="text"
                                                                      value={domainsSelectedOption}
                                                                      onChange={handleDomainsOptionChange}
                                                               />
                                                               <button className='savebt1' onClick={handleDomainsSave}>Save</button>
                                                        </div>
                                                 ) : (
                                                        <div>
                                                               <select className='option' value={domainsSelectedOption} onChange={handleDomainsOptionChange}>
                                                                      {domainsOptions.map((option) => (
                                                                             <option key={option} value={option}>
                                                                                    {option}
                                                                             </option>
                                                                      ))}
                                                               </select>
                                                               <button className='btedit1' onClick={toggleDomainsEditMode}>Edit</button>
                                                        </div>
                                                 )}
                                          </div>




                                          <div class="modal-footer">
                                                 {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                                 <button type="button" class="btn btn-primary">SUBMIT</button>
                                          </div>
                                   </div>
                            </div>
                     </div>

              </div>



       )
}

export default Add