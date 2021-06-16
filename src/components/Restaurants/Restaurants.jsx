import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';
import { Card, Button, Modal } from 'react-bootstrap';
import AddRestaurants from './AddRestaurants/AddRestaurants'
import Menu from './Menu/Menu'
import EditForm from './EditForm/EditForm';
import Header from './Header/Header';
import './style.css';
import { deleteRestaurantById } from '../../api';
let socket;

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);  


    const [show, setShow] = useState(false);

    const [modalId1, setModalId1] = useState('')

    useEffect(() => {
        (() => {
          socket = socketIOClient(process.env.REACT_APP_API_URL);
          socket.on("product-created", (data) => {
            setRestaurants(restaurants => {
                return[...restaurants, data]}
                )
          });
        })();
      }, []);
    
//     useEffect(() => {
//         (() => {
//           socket = socketIOClient(process.env.REACT_APP_API_URL);
//           socket.on("product-deleted", (data) => {
//               console.log(data);
//             setRestaurants(restaurants.filter(restaurant => restaurant._id !== data._id)) })
//           })();
//       });
    
//      useEffect(() => {
//         (() => {
//           socket = socketIOClient(process.env.REACT_APP_API_URL);
//           socket.on("product-updated", (data) => {
//               console.log(data);
//             setRestaurants(restaurants => {
//                return restaurants.map( restaurant => {
//                      if(restaurant._id === data._id) return data
//                      return restaurant
//                  })}
//                  )
//            });
//       })();
//     }, [])
    
    let newMenu = [];
    let newIngres = [];

    const handleModal = (e) => {
        setModalId1(e.currentTarget.value)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const generateIngres = (number, id, item) => {
        newIngres = [];
        for (var i = 0; i < parseInt(number); i++) {
            newIngres.push("ingredient" + ` ` + `${i + 1}`)
        }
        item.splice(0, item.length, ...newIngres);

    }  
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/restaurants")
        .then(res => res.json())
        .then(data => {
            setRestaurants(data.data)
        })
    }, [])

    const generateRestaurant = (name, cuisine, menu, id) => {
        for (var i = 0; i < parseInt(menu); i++) {
            newMenu.push({ item: `item` + ` ` + `${i + 1}`, description: '', idx: `${Date.now() + i}`, ingres: [] });
        };
        setRestaurants(restaurants.concat(
            {
                restName: name.charAt(0).toUpperCase() + name.slice(1),
                restCuisine: cuisine.charAt(0).toUpperCase() + cuisine.slice(1),
                restMenu: newMenu,
                restMenuNum: parseInt(menu),
                restId: id

            }));
        
        fetch(process.env.REACT_APP_API_URL +"/api/restaurant", {
            method: "POST",
            body: JSON.stringify({
                restName: name.charAt(0).toUpperCase() + name.slice(1),
                restCuisine: cuisine.charAt(0).toUpperCase() + cuisine.slice(1),
                restMenu: newMenu,
                restMenuNum: parseInt(menu),
                restId: id
            }),
            headers: {
                "Content-type": "Application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
        }).catch(err => {
            console.log(err)
        })

    }

    const updateRestaurantName = (value, restId) => {

        var i = restaurants.findIndex(x => x.restId === restId)
        let rest = restaurants[i]

        rest.restName = value;

        setRestaurants([...restaurants.slice(0, i), ...restaurants.slice(i)]);
    };

    const updateRestaurantCuisine = (value, restId) => {

        var i = restaurants.findIndex(x => x.restId === restId)
        let rest = restaurants[i]

        rest.restCuisine = value;

        setRestaurants([...restaurants.slice(0, i), ...restaurants.slice(i)]);
    }

    const updateRestaurantMenu = (value, restId) => {
        var index = restaurants.findIndex(x => x.restId === restId)
        let rest = restaurants[index]

        for (var i = 0; i < parseInt(value); i++) {
            newMenu.push({ item: `item` + `${i + 1}`, description: 'about item', idx: `${Date.now() + i}`, ingres: [] });
        }
        rest.restMenuNum = parseInt(value);
        rest.restMenu = newMenu;

        setRestaurants([...restaurants.slice(0, index), ...restaurants.slice(index)]);
    }

    //const updateMenuItem = (value, idx) => {
        //     // idea
        //     // restaurants.findIndex(({restMenu}) => restMenu.findIndex(x => x.idx === idx)
        //const menuItem = restaurants.find(({ restMenu }) => restMenu.find((menu) => menu.idx === idx))
        //     // var index = restaurants[i].restMenu.findIndex(x => x.idx === idx)
        //     // let rest = restaurant[i]
        //     // let item = restMenu[index]
        //     // let new = rest.item
        //menuItem.item = value

        //     // setRestaurants([...restaurants.slice(0, i), ...restaurants.slice(i)])


    //}

    // const findIndexOfMenuIdx = (menu, idx) => {menu.findIndex(x => x.idx === idx)};

    // const updateMenuItem =(value, idx) => {
    //     // Find the restaurant with an item that has the specified idx
    //     const restIndex = restaurants.findIndex(({restMenu}) => findIndexOfMenuIdx(restMenu, idx));
    //     const rest = restaurants[restIndex];
    //     // Update the item
    //     const menuItemIndex = findIndexOfMenuIdx(rest.restMenu, idx);
    //     const item = restMenu[menuItemIndex];
    //     const newItem = { ...item }; // Don't want to mutate the original object
    //     newItem.menuItem = value;
    //     // Update the menu
    //     const newMenu = [...rest.restMenu];
    //     newMenu[menuItemIndex] = newItem;
    //     // Passing setRestaurants a callback might be unnecessary here.
    //     setRestaurants((state) => [...state.slice(0, restIndex), {...rest, restMenu: newMenu}, ...state.slice(restIndex + 1)]);
    // }

    const deleteRestaurant = (restId, id) => {
        const newList = restaurants.filter((restaurants) => restaurants.restId !== restId);
        setRestaurants(newList);
        deleteRestaurantById(id)
    };

   // const deleteMenuItem = (idx) => {
        //find restaurant index
        //const menuItem = restaurants.filter(({ restMenu }) => restMenu.filter((menu) => menu.idx === idx))

        //delete index from restMenu
        // var index = restaurants.restMenu.findIndex(x => x.idx === idx)
        // restaurants.restMenu.splice(index);

        //setRestaurants(menuItem);
   // };

    return (
        <div>
            <Header />
            <AddRestaurants generateRestaurant={generateRestaurant} />
            <div className="rest">
                {restaurants.map((restaurants, index) => (
                    <Card className="cardRest" key={index}>
                        <Card.Body>
                            <Card.Title className="title">
                                <div>{`${restaurants.restName}`}</div>
                                <div>
                                    <Button className="editBtn" variant="link" size="lg" onClick={(e) => { handleShow(); handleModal(e) }} value={restaurants.restId}>✎</Button>
                                    <Modal show={show && (modalId1 == restaurants.restId)} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Restaurant</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditForm restaurants={restaurants} updateRestaurantName={updateRestaurantName} updateRestaurantCuisine={updateRestaurantCuisine} updateRestaurantMenu={updateRestaurantMenu} handleClose={handleClose} restName={restaurants.restName} restCuisine={restaurants.restCuisine} restMenuNum={restaurants.restMenuNum} restId={restaurants.restId} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <Button variant="link" onClick={() => deleteRestaurant(restaurants.restId, restaurants._id)}>❌</Button>
                            </Card.Title>
                            <Card.Text>
                                {`${restaurants.restName} serves ${restaurants.restCuisine} cuisine and has ${restaurants.restMenuNum} menu items.`}
                            </Card.Text>
                            <Menu restaurant={restaurants} generateIngres={generateIngres} restMenu={restaurants.restMenu} />
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
};

export default Restaurants
