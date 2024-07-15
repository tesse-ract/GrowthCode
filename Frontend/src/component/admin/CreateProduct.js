import React, { Fragment, useState, useEffect } from 'react';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../reducers/productSlice';
import MenuIcon from '@mui/icons-material/Menu';

function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { loading, error, ProductCreate } = useSelector((state) => state.product);

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const createProductHandler = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((image) => {
            myForm.append("images", image);
        });

        try {
            await dispatch(createProduct(myForm));
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    useEffect(() => {
        if (ProductCreate) {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [ProductCreate]);

    return (
        <Fragment>
            <div className='relative mt-2 grid grid-cols-1 md:grid-cols-[1fr_5fr] w-full h-screen'>
                <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                    <SideBar />
                </div>

                <div className='bg-[#EEEEEE] p-6 w-full'>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className='flex items-center'>
                            <button
                                className='md:hidden mr-4'
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <MenuIcon />
                            </button>
                            <h2 className='text-4xl font-bold mt-4'>
                                Create Product
                            </h2>
                        </div>
                    </div>

                    <form onSubmit={createProductHandler}>
                        <div className='bg-white mt-8 rounded-xl h-5/6 shadow-md flex justify-center flex-col w-full  mx-auto'>
                            <div className='flex flex-col md:flex-row justify-center'>
                                <div className=' border-2 border-black mx-4 md:mr-4 mt-4 items-center flex justify-center rounded-lg flex-col'>
                                    {imagesPreview.length > 0 ? (
                                        <div>
                                            <img className='rounded-full' src={imagesPreview} alt="Product Preview" width={100} />
                                        </div>
                                    ) : <i className="fa-solid fa-circle-plus text-9xl mb-10"></i>}

                                    <input
                                        className='text-center ml-6'
                                        type='file'
                                        accept="image/*"
                                        name="avatar"
                                        multiple
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>

                                <div className='productDetail mx-4 md:ml-6 mt-4 md:mt-0'>
                                    <p className='font-semibold mb-2'>Product Name</p>
                                    <input
                                        className='border-2 border-black rounded-lg w-full md:w-96 p-2'
                                        type='text'
                                        required
                                        placeholder='Enter product Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <p className='font-semibold mb-2 mt-4'>Product Description</p>
                                    <input
                                        className='border-2 border-black rounded-lg w-full md:w-96 p-2'
                                        type='text'
                                        required
                                        placeholder='Enter product Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    <p className='font-semibold mb-2 mt-4'>Product Price</p>
                                    <input
                                        className='border-2 border-black rounded-lg w-full md:w-96 p-2'
                                        type='number'
                                        required
                                        placeholder='Enter product price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />

                                    <p className='font-semibold mb-2 mt-4'>Product Category</p>
                                    <select
                                        className='border-2 border-black rounded-lg w-full md:w-96 p-2'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select product category</option>
                                        <option value="casestudies">Case Studies</option>
                                        <option value="ebooks">E-Book</option>
                                        <option value="courses">Courses</option>
                                        <option value="adtemplates">Ad Templates</option>
                                        <option value="contentcalendar">Content Calendar</option>
                                    </select>

                                    <p className='font-semibold mb-2 mt-4'>Product Stock(max-100)</p>
                                    <input
                                        className='border-2 border-black rounded-lg w-full md:w-96 p-2'
                                        type='number'
                                        required
                                        placeholder='Enter product Stock'
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                {showSuccessMessage && (
                                    <p className='text-green-500 text-xl text-center p-2 font-bold'>
                                        Product created successfully
                                    </p>
                                )}
                                {error && (
                                    <div className='text-red-500 text-lg font-semibold text-center'>
                                        {typeof error === 'string' ? (
                                            <p>{error}</p>
                                        ) : (
                                            Object.keys(error).map((key) => <p key={key}>{error[key]}</p>)
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className='w-full flex justify-center'>
                                <p className=" mt-6 mb-6 bg-black rounded-lg text-white w-40 text-center p-3 px-6 cursor-pointer">
                                    <button type='submit'>
                                        {loading ? 'Creating...' : 'Create Product'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default CreateProduct;
