import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Register the components you are going to use
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin);
  if(!user){
    navigate('/signIn');
  }
  console.log("user in dash", user);
  let userRole;
  useEffect(()=>{ 
  if(user.user.userDetails.role !=="admin"){
    navigate('/profile')
  }else{
    userRole = user.user.userDetails.role;
  }
  },[user?.userDetails?.role])
  
 
  
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "4000",
        backgroundColor: ["#0E9CFF"],
        hoverBackgroundColor: ["#0E9CFF"],
        data: [0, 4000],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className='mt-2 grid grid-cols-1 md:grid-cols-[1fr_5fr] w-full min-h-screen'>
      <div className=''>
        <SideBar />
      </div>

      {userRole==="admin" && <div className='bg-[#EEEEEE] p-6'>
        <h2 className='text-2xl md:text-4xl font-bold mt-4'>Dashboard</h2>

        <div className=' w-full border-2 border-[#E6EDFF] mt-8 flex flex-col md:flex-row justify-between p-6 bg-white rounded-lg'>
          <div className='text-center border-b-2 md:border-b-0 md:border-r-2 border-[#E6EDFF] w-full md:w-auto pb-4 md:pb-0'>
            <h2 className='font-bold text-xl md:text-3xl'>12,342</h2>
            <p className='font-normal'>Total users</p>
          </div>

          <div className='text-center border-b-2 md:border-b-0 md:border-r-2 border-[#E6EDFF] w-full md:w-auto pb-4 md:pb-0'>
            <h2 className='font-bold text-xl md:text-3xl'>248</h2>
            <p className='font-normal'>Total Products</p>
          </div>

          <div className='text-center border-b-2 md:border-b-0 md:border-r-2 border-[#E6EDFF] w-full md:w-auto pb-4 md:pb-0'>
            <h2 className='font-bold text-xl md:text-3xl'>62,342,987</h2>
            <p className='font-normal'>Total Amounts</p>
          </div>

          <div className='text-center w-full md:w-auto'>
            <h2 className='font-bold text-xl md:text-3xl'>12,342,864</h2>
            <p className='font-normal'>Total Orders</p>
          </div>
        </div>

        <div className='w-full mt-10 h-64 md:h-5/6'>
          <div className='bg-white h-full relative lineChart w-full rounded-lg p-4'>
            <Line data={lineState} options={options} />
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Dashboard;
