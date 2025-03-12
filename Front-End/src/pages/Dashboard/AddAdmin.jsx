import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AdminApi from '../../../service/Admins';
import { toast } from 'sonner';
import { useState } from 'react';



function AddAdmin() {
  const [admin, setAdmin] = useState({
    first_name: '',
    last_name: '',
    matricule: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postal_code: '',
    role: 'admin',
    name :''
  });
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (admin.password === confirmPassword) {
      setAdmin({...admin, name: admin.first_name + ' ' + admin.last_name});
     try {
      const response = AdminApi.addAdmin(admin);
      if (response.status >= 200 && response.status < 300) {
        toast("Successfully added admin", {
          description: "Admin added successfully"
        });
      } else {
        toast('error', {
          description: response.data.message
        });
      }
     } catch (error) {
       toast('error', {
         description: response.data.message
       });
     }
    }
  }
  return (
    <div className='px-4 flex flex-col gap-4 justify-center py-4 items-center'>
      <h1 className='text-2xl font-bold'>Add Admin</h1>
      <form className='w-5/6 bg-white dark:bg-slate-950 border rounded-2xl p-4 grid grid-cols-2 gap-4 shadow-xl'>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="firstname">First name:</Label>
          <Input type="text" name="first_name" placeholder="First Name..." className=" col-span-3" id="firstname" onChange={e => setAdmin({...admin, first_name:e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="lastname">Last name:</Label>
          <Input type="text" name="last_name" placeholder='Last Name...' className=" col-span-3" id="lastname" onChange={e => setAdmin({...admin, last_name:e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="matricule">Matricule:</Label>
          <Input type="text" name="matricule" placeholder="Matricule..." className=" col-span-3" id="matricule"  onChange={e => setAdmin({...admin,matricule :e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="email">Email address:</Label>
          <Input type="email" name="email" placeholder='E-mail...' className="col-span-3" id="email" onChange={e => setAdmin({...admin, email:e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder='Password...' className="col-span-3" id="password" onChange={e => setAdmin({...admin, password:e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input type="password" name="confirmPassword" placeholder='Password Confirme...' className="col-span-3" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)}/>
        </div>
        
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="phone">Phone:</Label>
          <Input type="text" name="phone" placeholder='Phone Number...' className=" col-span-3" id="phone" onChange={e => setAdmin({...admin, phone:e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="address">Address:</Label>
          <Input type="text" name="address" placeholder='Address...' className=" col-span-3" id="address" onChange={e => setAdmin({...admin, address:e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="city">City:</Label>
          <Input type="text" name="city" placeholder='City...' className=" col-span-3" id="city"  onChange={e => setAdmin({...admin, city:e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="country">Country:</Label>
          <Input type="text" name="country" placeholder='Country...' className=" col-span-3" id="country" onChange={e => setAdmin({...admin, country:e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="postal_code">ZIP code:</Label>
          <Input type="text" name="postal_code" placeholder='Zip Code...' className=" col-span-3" id="postal_code"  onChange={e => setAdmin({...admin, postal_code:e.target.value})}/>
        </div>
      <div className="flex justify-end col-span-2">
        <Button  className="bg-primary dark:bg-slate-900 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Save changes</Button>
        </div>
      </form>
    </div>
  )
}

export default AddAdmin
