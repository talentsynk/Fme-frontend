
const NewAccount = () => {
    return (
  
          <div className=" flex p-8">
              <div className="w-[30%]">
                <h5 className="font-semibold text-[#101928]">Personal Information</h5>
                <p className="text-[14px] text-[#667185]">update your personal details here</p>
                <button className=" w-[129px] h-9 text-white font-semibold border-[1px] " disabled>Save changes </button>
              </div>
              <form action="" className="  w-[70%] space-y-4">
                <div className=" flex gap-2 ">
                  <div className=" flex-1">
                    <label htmlFor="firstName" className="text-[#101928] font-semibold text-sm">First Name</label>
                    <input className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="text" id="firstName" />
                  </div>
                  <div className=" flex-1">
                  <label htmlFor="lastName" className="text-[#101928] font-semibold text-sm">Last Name</label>
                    <input className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="text" id="lastName" />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="address" className="text-[#101928] font-semibold text-sm">Address</label>
                  <input type="text" className=" w-full border-[#D0D5DD] border-solid rounded-md p-4 border" name="" id="address" />
                </div>
                <div className="">
                  <label htmlFor="phone" className="text-[#101928] font-semibold text-sm">Phone Number</label>
                  <input type="number" className=" w-full border-[#D0D5DD] border-solid rounded-md p-4 border" name="" id="phone" />
                </div>
                <div className="">
                  <label htmlFor="email" className="text-[#101928] font-semibold text-sm">Email address</label>
                  <input className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="email" name="" id="email" />
                </div>
                <div className="">
                  <label htmlFor="residence" className="text-[#101928] font-semibold text-sm">State of residencce</label>
                  <input className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border" type="text" name="" id="residence" />
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
  