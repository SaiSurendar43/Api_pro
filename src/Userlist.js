import react from 'react';
import { useState,useEffect } from "react";
import axios from 'axios';
// import { fetchUrl } from '../proxy';
import UserAdd from './UserAdd';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function Userlist(){
    
    const [data , setData] = useState([])
   

    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState("id");
    // const [open, setOpen] = useState(false);
    const [firstName1, setFirstName] = useState(['java','html','python'])
    const [lastName1, setLastName] = useState(['java','html','python'])
    const [email1, setEmail] = useState([1,2,3,4,5])
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [name, setNmae] = useState('')

    const [skills, setSkills] = useState([])
    const [primaryskills, setPrimaryskills] = useState([])
    const [experience, setExperience] = useState([])
    const [domain, setDomain] = useState([])
    const [propsend, setPropsend] = useState(false)

    const [open, setOpen] = useState(false);

    // const handleClickOpen1 = () => {
    //   setPropsend(true);
    // };
  
    const handleClose1 = () => {
      setOpen(false);
    };
 
    
    const handleClickOpen = () => {
      axios.get("http://192.168.0.116:8000/skills/python/")
      .then(response => {
        const getPrimarySkill = response.data.map(val=>val.primary_skill);
        const getSkill = response.data.map(val=>val.skills);
        const getExperience = response.data.map(val=>val.experience);
        const getDomain = response.data.map(val=>val.domains);
        console.log('getPrimarySkill',getPrimarySkill);
        console.log('getSkill',getSkill);
        console.log('getExperience',getExperience);
        console.log('getDomain',getDomain);       
        setSkills(getSkill);
        setPrimaryskills(getPrimarySkill);
        setExperience(getExperience);
        setDomain(getDomain);


 
      })
      .catch(error => {
        console.log('errr',error);
      });


        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

        useEffect(() => {
            axios.get("http://192.168.0.116:8000/employee/")
              .then(response => {
                setData(response.data);
                // console.log('response.data',response.data);
              })
              .catch(error => {
                console.log('errr',error);
              });
          }, []);
          

          const handleSearch = (event) => {
            setSearchTerm(event.target.value);
          }

          const handleColumnChange = (event) => {
            setSearchColumn(event.target.value);
          };


    

    const filteredEmployees1 = data?.filter(employee =>
      
        employee.id.toString().includes(searchTerm) ||
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ( employee.skills.join(', ').toLowerCase().includes(searchTerm.toLowerCase())) ||
        employee.primary_skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.experience.toString().includes(searchTerm.toLowerCase()) ||
       ( employee.domains == null ||  employee.domains.toLowerCase().includes(searchTerm.toLowerCase()) )
      );


      const submit_data = () =>{

        const userData = {
          Name : name ,
          Skill : skills ,
          Primary_skill : primaryskills,
          Experience : experience ,
          Domain : domain 
        }

        axios.post(`vhbjfd`,{userData})
        .then(val=>{
          console.log(val)
        }).catch(err=>{
          console.log(err,'error')
        })
          
          
          
          
        

      }


    
    return(
     <div >
         <div style={{ display:'flex',justifyContent:'center',marginTop:'15px'}}>


 <Button variant="outlined" sx={{marginRight:'50px'}} onClick={handleClickOpen}>
        Open dialog
      </Button>

<TextField id="outlined-password-input" sx={{width:'10%',marginRight:'30px'}}
          label="SEARCH"
          type="text"
          size="small"
          autoComplete="current-password"   value={searchTerm}
       onChange={handleSearch}/>

{/* <Button variant="outlined" sx={{marginRight:'50px'}} onClick={handleClickOpen1}>
        ADD
      </Button> */}

      <Box>
        <UserAdd  data = {propsend}/>
      </Box>
   
</div>

      

        <div>


        <TableContainer sx={{margin:'20px',width:'80%',display:'flex',marginLeft:'11%'}} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{backgroundColor:'black',color:'white'}}>
          <TableRow>
            <TableCell sx={{color:'white',fontSize:'15px', fontWeight: 'bold'}}>ID</TableCell>
            <TableCell sx={{color:'white',fontSize:'15px', fontWeight: 'bold'}} align="center">NAME</TableCell>
            <TableCell sx={{color:'white',fontSize:'15px', fontWeight: 'bold'}} align="center">SKILLS</TableCell>
            <TableCell sx={{color:'white',fontSize:'15px', fontWeight: 'bold'}} align="center">PRIMARY SKILL</TableCell>
            <TableCell sx={{color:'white',fontSize:'15px', fontWeight: 'bold'}} align="center">EXPERIENCE</TableCell>
            <TableCell sx={{color:'white',fontSize:'15px', fontWeight: 'bold'}} align="center">DOMAIN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees1&&filteredEmployees1.map((row,i) => (
            <StyledTableRow key={i}>
              <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center">{Array.isArray(row.skills)  ? row.skills.join(", ") :  ''}</TableCell>
              {/* <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center">{Array.isArray(row.skills)  ? row.skills.join(", ") : row.skills == null ? row.skills : ''}</TableCell> */}
              <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center">{row.primary_skill}</TableCell>
              <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center">{row.experience}</TableCell>
              <TableCell key={i} sx={{fontSize:'15px', fontWeight: 'bold'}} align="center">{row.domains != null ?  row.domains : row.domains}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>

        
     
      <div>
     
      <Dialog
      //  sx={{width:'100%',}}
      open={open}  
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{marginLeft:'120px',width: 270}}  id="alert-dialog-title">
        FORM DETAILS  
         <IconButton onClick={handleClose} sx={{marginLeft:'80px',marginTop:'-5px'}}>
         <CloseIcon    />
         </IconButton>
        </DialogTitle>
        {/* <IconButton /> */}
       
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"> */}
          <Box sx={{ width: '100%' }}>

          

      <FormControl sx={{ m: 1, width: 270 }}>
        <Box>
        <TextField onChange={name} sx={{ width: '100%' ,marginLeft:'50px', }} id="outlined-basic" label="NAME" variant="outlined" />
        </Box>
       
        
      </FormControl>
     

      
  <Box>
<FormControl variant="standard"  sx={{ m: 1, width: 270,marginLeft:'60px' }}>
        <InputLabel id="demo-simple-select-standard-label">SKILLS</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          sx={{ width: '100%' }} 
          value={skills}
          onChange={e=>setSkills(e.target.value)}
          label="Age"
        >
         {firstName1.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </Box>

      <Box>
<FormControl variant="standard"  sx={{ m: 1, width: 270 ,marginLeft:'60px'}}>
        <InputLabel id="demo-simple-select-standard-label">PRIMARY SKILL</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          sx={{ width: '100%' }} 
          value={primaryskills}
          onChange={e=>setPrimaryskills(e.target.value)}
          label="Age"
        >
          {lastName1.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </Box>


      <Box>
<FormControl variant="standard"  sx={{ m: 1, width: 270 ,marginLeft:'60px'}}>
        <InputLabel id="demo-simple-select-standard-label">EXPERIENCE</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          sx={{ width: '100%' }} 
          value={experience}
          onChange={e=>setExperience(e.target.value)}
          label="Age"
        >
         {email1.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </Box>

      <Box>
<FormControl variant="standard"  sx={{ m: 1, width: 270,marginLeft:'60px' }}>
        <InputLabel id="demo-simple-select-standard-label">DOMAIN</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          sx={{ width: '100%' }} 
          value={domain}
          onChange={e=>setDomain(e.target.value)}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </Box>

      <Box sx={{marginTop:'15px',marginLeft:'39%'}}>
      <Button variant="outlined" onClick={submit_data}>SUBMIT</Button>
      </Box>
 

    </Box>

          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>

      
      
    </div>
 

     </div>
    )
}

export default Userlist;