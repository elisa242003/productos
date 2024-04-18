'use client'
import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from './actions.js';
import Link from 'next/link.js';
import Router from 'next/router.js';

const EditProductPage = ({ params }) => {
    const id = params.id;
    const [product, setProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        category: '',
        name: '',
        price: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(id);
                setProduct(fetchedProduct);
                setUpdatedProduct(fetchedProduct);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!updatedProduct.category.trim()) {
            errors.category = 'La categoría es obligatoria';
            valid = false;
        }

        if (!updatedProduct.name.trim()) {
            errors.name = 'El nombre es obligatoria';
            valid = false;
        }

        if (updatedProduct.price <= 0) {
          errors.price = 'El precio debe ser mayor que cero';
          valid = false;
      } else {
          if(!updatedProduct.price.match("^[0-9]+$")){
              errors.price ="El precio debe de ser un numero"
          } 
        }

        if (!updatedProduct.description.trim()) {
            errors.description = 'La descripción es obligatoria';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await updateProduct(updatedProduct);
                alert("Producto editado correctamente");
                Router.push('/products');
            } catch (error) {
                console.error('Error al actualizar el producto');
            }
        }
    };

    return (
        <div className="bg-pink-300 p-6 mt-6">
            <h1 className="text-black font-serif text-3xl text-center mb-8">Mi formulario</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-black">Categoria: </label>
                    <input
                        type="text"
                        name="category"
                        value={updatedProduct.category}
                        className="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleInputChange} />
                    {errors.category && <span className="text-red-500">{errors.category}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-black">Nombre: </label>
                    <input
                        type="text"
                        name="name"
                        value={updatedProduct.name}
                        className="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleInputChange} />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-black">Precio: </label>
                    <input
                        type="number"
                        name="price"
                        value={updatedProduct.price}
                        className="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleInputChange} />
                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-black">Descripción: </label>
                    <input
                        type="text"
                        name="description"
                        value={updatedProduct.description}
                        className="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleInputChange} />
                    {errors.description && <span className="text-red-500">{errors.description}</span>}
                </div>

                <button
                    className="mx-4 bg-pink-500 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300">
                    Actualizar
                </button>

                <Link
                  href="/products"
                 className="mx-4 bg-pink-500 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300"
                >
                  Cancelar
                </Link>
            </form>
        </div>
    );
};

export default EditProductPage;

/*"use client"

import { useEffect, useState } from "react"
import { getProduct } from"../../actions";

export default function Page({ params }) {

    const [product, setProduct] = useState({});

    useEffect(() => {
      const loadProduct = async () => {
        const productResult = await getProduct(params.id);

        setProduct(productResult.products)

        if(productResult.error){
          alert(productResult.error.message);
        }
      };
      loadProduct();
    }, []);

  //return <div>Nota ID: {params.id} </div>

  return (
    <form>
      <input type="text" value={product?.name || ''} className="text-black"/>
    </form>
  )
}*/