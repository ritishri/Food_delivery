import { useState, useEffect } from 'react';
import menuData from '../menu/menu.json';
import background from '../images/menu1.webp'
import Header from '../components/Header.js'

function Menu() {
  const [menu, setMenu] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [editItemId, setEditItemId] = useState(null); 
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: null,
  });
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItemData, setNewItemData] = useState({
    name: '',
    category: '',
    price: '',
    image: null,
  });

  // Load menu data and user role
  useEffect(() => {
    const storedMenu = JSON.parse(localStorage.getItem('menu')) || menuData;
    setMenu(storedMenu);

    const role = localStorage.getItem('role');
    setUserRole(role);
    //  localStorage.removeItem('menu');
  }, []);



  // Add to Cart
  const addToCart = (item) => {
    if (userRole !== 'user') {
      setPopupMessage('Only users can add items to the cart!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }

    // Add item to cart in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item exists
    } else {
      cart.push({ ...item, quantity: 1 }); // Add new item with quantity 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show popup message for item added to cart
    setPopupMessage(`${item.name} added to cart!`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // Edit Item
  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setEditFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image || null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditFormData({ ...editFormData, image: files[0] || null });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleSaveEdit = () => {
    if (editItemId === null) {
      console.log("editItemId is null");
      return;
    }

    const updatedMenu = menu.map((item) => {
      if (item.id === editItemId) {
        const updatedItem = {
          ...item,
          ...editFormData,
        };

        if (editFormData.image && typeof editFormData.image !== 'string') {
          const reader = new FileReader();
          reader.onloadend = () => {
            updatedItem.image = reader.result; // Store Base64 encoded image
            const updatedMenuWithImage = menu.map((menuItem) =>
              menuItem.id === editItemId ? updatedItem : menuItem
            );
            setMenu(updatedMenuWithImage);
            localStorage.setItem('menu', JSON.stringify(updatedMenuWithImage));
            setEditItemId(null);
            setPopupMessage('Item updated successfully!');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
          };
          reader.readAsDataURL(editFormData.image);
          return;
        }

        return updatedItem;
      }
      return item;
    });

    
    setMenu(updatedMenu);
    localStorage.setItem('menu', JSON.stringify(updatedMenu));
    setEditItemId(null);
    setPopupMessage('Item updated successfully!');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditFormData({
      name: '',
      category: '',
      price: '',
      image: null,
    });
  };

  // Add New Item
  const handleAddItemChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewItemData({ ...newItemData, image: files[0] || null });
    } else {
      setNewItemData({ ...newItemData, [name]: value });
    }
  };

  const handleAddNewItem = () => {
    const newItem = {
      id: Date.now(),
      ...newItemData,
    };

    if (newItemData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newItem.image = reader.result; // Store Base64 encoded image
        const updatedMenu = [...menu, newItem];
        setMenu(updatedMenu);
        localStorage.setItem('menu', JSON.stringify(updatedMenu));

        setShowAddForm(false);
        setNewItemData({
          name: '',
          category: '',
          price: '',
          image: null,
        });

        setPopupMessage('New item added successfully!');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      };
      reader.readAsDataURL(newItemData.image);
    } else {
      const updatedMenu = [...menu, newItem];
      setMenu(updatedMenu);
      localStorage.setItem('menu', JSON.stringify(updatedMenu));

      setShowAddForm(false);
      setNewItemData({
        name: '',
        category: '',
        price: '',
        image: null,
      });

      setPopupMessage('New item added successfully!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error('Invalid ID provided for deletion:', id); // Debugging log
      return;
    }

    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedMenu = menu.filter(item => item.id !== id); // Filter out the item
      setMenu(updatedMenu); // Update state

      try {
        localStorage.setItem('menu', JSON.stringify(updatedMenu)); // Update localStorage
        setPopupMessage('Item deleted successfully!');
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          setPopupMessage('Error: LocalStorage is full. Please delete more items.');
        }
      }
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    }
  };

  return (
    <div className="container-fluid position-relative min-vh-100 p-0" style={{ overflow: 'hidden' }}>

    <div className="position-absolute  w-100 h-100" 
         style={{
           background: `url(${background}) no-repeat center center`,
           backgroundSize: 'cover',
           filter: 'blur(5px)',
           zIndex: -1, 
         }} 
    />
    
    <Header />
    {userRole === 'admin' && (
      <button className="btn btn-success mb-3 m-md-4" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close Add Item' : 'Add New Item'}
      </button>
    )}

      {/* Add New Item Form */}
      {showAddForm && (
        <div className="card p-3 mb-4">
          <h4>Add New Item</h4>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newItemData.name}
            onChange={handleAddItemChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newItemData.category}
            onChange={handleAddItemChange}
            className="form-control mb-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newItemData.price}
            onChange={handleAddItemChange}
            className="form-control mb-2"
          />
          <input
            type="file"
            name="image"
            onChange={handleAddItemChange}
            className="form-control mb-2"
          />
          <button className="btn btn-success" onClick={handleAddNewItem}>
            Add Item
          </button>
        </div>
      )}

      {/* Menu Items */}
      <div className="row m-md-2">
        {menu
          .filter((item) => item && typeof item === 'object') // Filter out invalid items
          .map((item) => (
            <div key={item.id} className="col-md-3">
              <div className="card">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      height: '200px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <span>No Image</span>
                  </div>
                )}
                <div className="card-body">
                  {editItemId === item.id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="text"
                        name="category"
                        value={editFormData.category}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="file"
                        name="image"
                        onChange={handleEditChange}
                        className="form-control mb-2"
                      />
                      <button className="btn btn-success me-2" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5>{item.name}</h5>
                      <p>Category: {item.category}</p>
                      <p>Price: Rs {item.price}</p>
                      {userRole === 'admin' && (
                        <>
                          <button
                            className="btn btn-success me-2"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      
                      {userRole === 'user' && (
                        <button
                          className="btn btn-success"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Menu;
