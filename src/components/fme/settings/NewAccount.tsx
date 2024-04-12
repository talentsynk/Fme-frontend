import { useState } from "react";

const NewAccount = () => {

  const [NewAccountData, setNewAccountData] = useState({
    firstName: '',
    lastName: '',
    address:'',
    phone: '',
    email: '',
    state:''
  });

  //to check if atleast an input  in the form is empty
  const isFormEmpty = () => {
    return Object.values(NewAccountData).every(value => value === '');
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Check if the input is a file input
    if (e.target.type === 'file') {
      setNewAccountData(prevState => ({
        ...prevState,
        [name]: e.target.files[0]  // Store the first file from FileList
      }));
    } else {
      setNewAccountData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle form submission logic here
  };

    return (
  
          <div className=" flex p-8">
              <div className="w-[30%] space-y-2">
                <h5 className="font-semibold text-[#101928]">Personal Information</h5>
                <p className="text-[14px] text-[#667185]">update the personal details of the person you want to add here</p>
                <button className={`w-[129px] h-9 text-white font-semibold border-[1px] rounded-md ${isFormEmpty() ? 'bg-[#D0D5DD] cursor-not-allowed' : 'bg-[#00932E] border-[#00932E] hover:bg-[#007427]'}`} 
          disabled={isFormEmpty()}>Save changes </button>
              </div>
              <form onSubmit={handleSubmit} action="" className="  w-[70%] space-y-4">
                <div className=" flex gap-2 ">
                  <div className=" flex-1">
                    <label htmlFor="firstName" className="text-[#101928] font-semibold text-sm">First Name</label>
                    <input className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="text" id="firstName" name="firstName" value={NewAccountData.firstName}
              onChange={handleChange} />
                  </div>
                  <div className=" flex-1">
                  <label htmlFor="lastName" className="text-[#101928] font-semibold text-sm">Last Name</label>
                    <input name="lastName" value={NewAccountData.lastName}
              onChange={handleChange} className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="text" id="lastName" />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="address" className="text-[#101928] font-semibold text-sm">Address</label>
                  <input name="address" value={NewAccountData.address}
              onChange={handleChange} type="text" className=" w-full border-[#D0D5DD] border-solid rounded-md p-4 border" name="" id="address" />
                </div>
                <div className="">
                  <label htmlFor="phone" className="text-[#101928] font-semibold text-sm">Phone Number</label>
                  <input name="phone" value={NewAccountData.phone}
              onChange={handleChange} type="number" className=" w-full border-[#D0D5DD] border-solid rounded-md p-4 border"  id="phone" />
                </div>
                <div className="">
                  <label htmlFor="email" className="text-[#101928] font-semibold text-sm">Email address</label>
                  <input name="email" value={NewAccountData.email}
              onChange={handleChange} className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="email"  id="email" />
                </div>
                <div className="">
                  <label htmlFor="residence" className="text-[#101928] font-semibold text-sm">State of residencce</label>
                  <input className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="text" name="state" value={NewAccountData.state}
              onChange={handleChange} id="residence" />
                </div>
                <div className="">
                    <label htmlFor="file">Document of operation</label>
                    <input className="w-full border-[#D0D5DD] border-solid  p-4 border flex justify-center items-center h-[218px] rounded-lg" type="file" name="" id="" />
                </div>
              </form>
            </div>
  
    )
  }
  
  export default NewAccount
  