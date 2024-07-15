import React, { Fragment } from 'react'
import SideBar from './SideBar'
import { DataGrid } from '@mui/x-data-grid';


function Review() {
    const columns = [

        {
            field: "id",
            headerName: "REVIEW ID",
            minWidth: 150,
            flex: 0.5
        },

        {
            field: "user",
            headerName: "USER NAME",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "rating",
            headerName: "RATING",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "comment",
            headerName: "COMMENT",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },

        {
            field: "action",
            flex: 0.3,
            headerName: "ACTION",
            minWidth: 150,
            type: "number",
            sortable: false,
            //   renderCell: (params) => {
            //     return (
            //       <Fragment>
            //         <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
            //           <EditIcon />
            //         </Link>

            //         <Button
            //           onClick={() =>
            //             deleteProductHandler(params.getValue(params.id, "id"))
            //           }
            //         >
            //           <DeleteIcon />
            //         </Button>
            //       </Fragment>
            //     );
            //   },
        },
    ];

    const rows = [
        {
            id: "123456789",
            employeeName: "Mr. Bashir",
            role: "Admin",
            email: "bashir@gmail.com",
            amount: "1234",
            name: "Shirt",
        },
        {
            id: "123456789",
            date: "12/2/2024",
            status: "Processing",
            price: "₹120",
            amount: "124645",
            name: "Shirt",
        },
        {
            id: "123456789",
            date: "12/2/2024",
            status: "Processing",
            price: "₹120",
            amount: "1231",
            name: "Shirt",
        },
        {
            id: "123456789",
            user: "bashir@gmail.com",
            rating: "4/5",
            comment: "Apple is not soo cool",
        }
    ];

  return (
    <Fragment>
            <div className='mt-2 grid grid-cols-[1fr_5fr] w-full h-screen '>
                <div className=''>
                    <SideBar />
                </div>

                <div className=' bg-[#EEEEEE] p-6 '>
                    <h2 className='text-4xl font-bold mt-4'>
                        All Reviewed
                    </h2>

                    <div className='bg-white mt-8 rounded-xl h-5/6 shadow-md'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight

                        />
                    </div>


                </div>

            </div>
        </Fragment>
  )
}

export default Review
