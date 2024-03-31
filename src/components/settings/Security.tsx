import React from 'react'

const Security = () => {
  return (
    <section className=" flex p-8">
        <div className="w-[30%] space-y-4">
            <h4 className=" text-[#101928] font-semibold">Security</h4>
            <p className=" text-[#667185] text-sm">This image will be displayed on your profile</p>
            <button className="w-[129px] h-9 mt-4 text-white font-semibold border-[1px] rounded-md bg-[#00932E]">Save changes</button>
        </div>
        <form action="" className="w-[70%] flex flex-col gap-4">
            <div className="">
                <label htmlFor="" className="">Password</label>
                <input type="password" className=" w-full border-[#D0D5DD] border-solid rounded-md p-4 border" />
            </div>
            <div className="">
            <label htmlFor="" className="">New Password</label>
                <input type="password" className=" w-full border-[#D0D5DD] border-solid rounded-md p-4 border" placeholder='Enter Password' />
            </div>
        </form>
    </section>
  )
}

export default Security
