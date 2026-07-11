import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Package,
  Tag,
  IndianRupee,
  Layers,
  Calendar,
  ImagePlus,
  FileText,
  CheckCircle,
  RotateCcw,
  Save
} from "lucide-react";

import api from "../interceptors/axiosConfig";


function EditProduct() {

  const { id } = useParams();
const navigate = useNavigate();

const [loading, setLoading] = useState(false);

const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

const fileRef = useRef(null);

const [oldProduct, setOldProduct] = useState(null);

const [product, setProduct] = useState({
  name: "",
  brand: "",
  price: "",
  description: "",
  available: true,
  quantity: "",
  category: "",
  imageName: ""
});

useEffect(() => {
  fetchProduct();
}, [id]);

const fetchProduct = async () => {
  try {
    const res = await api.get(`/Greet/${id}`);

    const p = {
      name: res.data.name,
      brand: res.data.brand,
      price: res.data.price,
      description: res.data.description,
      available: res.data.available,
      quantity: res.data.quantity,
      category: res.data.category,
      imageName: res.data.imageName
    };

    setProduct(p);
    setOldProduct({ ...p });
  } catch (err) {
    toast.error("Unable to fetch product");
  }
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setProduct(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append(
      "product",
      new Blob(
        [JSON.stringify(product)],
        { type: "application/json" }
      )
    );

    if (image) {
      formData.append("image", image);
    }

    await api.put(
      `/admin/update/${id}`,
      formData
    );

    toast.success("Product Updated Successfully");

    navigate(`/product/${id}`);
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);

    toast.error(
      err.response?.data || "Update failed"
    );
  } finally {
    setLoading(false);
  }
};

const handleReset = () => {
  setProduct({ ...oldProduct });

  setImage(null);

  setImagePreview(null);

  if (fileRef.current) {
    fileRef.current.value = "";
  }
};
return (
<div className="
min-h-screen
bg-[#F8FAFC]
py-12
px-5
">
<div className="
max-w-5xl
mx-auto
bg-white
rounded-3xl
shadow-xl
border
border-slate-200
p-10
">
<div className="
flex
items-center
gap-4
mb-10
">
<div className="
bg-blue-100
text-blue-600
p-3
rounded-2xl
">
<Package size={32}/>
</div>
<div>
<h1 className="
text-4xl
font-extrabold
text-[#1E293B]
">

Edit Product

</h1>
<p className="text-slate-500">
Update JDCommerce product details
</p>
</div>
</div>
<form
onSubmit={handleUpdate}
className="space-y-8"
>
<div className="
grid
md:grid-cols-2
gap-6
">
<div>
<label className="flex gap-2 font-semibold text-slate-700">
<Tag size={18}
className="text-blue-600"
/>
Product Name
</label>
<input
name="name"
value={product.name}
onChange={handleChange}
className="
w-full
mt-2
px-4
py-3
rounded-xl
border
focus:ring-2
focus:ring-blue-500
outline-none
"
/>
</div>
<div>
<label className="flex gap-2 font-semibold text-slate-700">
<Package size={18}
className="text-blue-600"
/>
Brand
</label>
<input
name="brand"
value={product.brand}
onChange={handleChange}
className="
w-full
mt-2
px-4
py-3
rounded-xl
border
"

/>
</div>
<div>

<label className="flex gap-2 font-semibold text-slate-700">

<IndianRupee size={18}
className="text-blue-600"
/>

Price

</label>
<input

type="number"

name="price"

value={product.price}

onChange={handleChange}

className="
w-full
mt-2
px-4
py-3
rounded-xl
border
"

/>

</div>
<div>

<label className="flex gap-2 font-semibold text-slate-700">

<Layers size={18}
className="text-blue-600"
/>

Quantity

</label>


<input

type="number"

name="quantity"

value={product.quantity}

onChange={handleChange}

className="
w-full
mt-2
px-4
py-3
rounded-xl
border
"

/>

</div>
<div>

<label className="flex gap-2 font-semibold text-slate-700">

<Tag size={18}
className="text-blue-600"
/>

Category

</label>
<input

name="category"

value={product.category}

onChange={handleChange}

className="
w-full
mt-2
px-4
py-3
rounded-xl
border
"

/>
</div>





</div>
<div>

<label className="flex gap-2 font-semibold">

<FileText
size={18}
className="text-blue-600"
/>

Description

</label>


<textarea

rows="5"

name="description"

value={product.description}

onChange={handleChange}

className="
w-full
mt-2
px-4
py-3
rounded-xl
border
"

/>


</div>









<div>


<label className="flex gap-2 font-semibold">

<ImagePlus
size={18}
className="text-blue-600"
/>

Product Image

</label>



<input

ref={fileRef}

type="file"

accept="image/*"

onChange={handleImageChange}

className="mt-3"

/>





{

imagePreview ?

<img

src={imagePreview}

className="
mt-5
w-48
h-48
rounded-2xl
object-cover
border
"

/>


:

product.imageName &&

<img

src={product.imageName}

className="
mt-5
w-48
h-48
rounded-2xl
object-cover
border
"

/>


}





</div>









<div className="
flex
items-center
gap-3
bg-blue-50
p-4
rounded-xl
">


<input

type="checkbox"

name="available"

checked={product.available}

onChange={handleChange}

/>


<CheckCircle
className="text-green-600"
/>


<span className="font-semibold">

Available

</span>


</div>








<div className="
flex
justify-end
gap-5
">


<button

type="button"

onClick={handleReset}

className="
flex
gap-2
items-center
px-8
py-3
rounded-xl
border
hover:bg-slate-100
"

>

<RotateCcw size={18}/>

Reset

</button>





<button

disabled={loading}

className="
flex
gap-2
items-center
px-8
py-3
rounded-xl
bg-blue-600
text-white
font-semibold
hover:bg-blue-700
"

>

<Save size={18}/>

{
loading
?
"Updating..."
:
"Update Product"
}


</button>


</div>





</form>



</div>



</div>

);

}


export default EditProduct;