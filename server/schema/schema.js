const graphql =require('graphql');
const User =require('../models/User');
const Restaurant=require('../models/Rest');
const Order =require('../models/Order');
const Cart =require('../models/cart');
const Address =require('../models/address')

const Category =require('../models/Category')
const Product = require('../models/Product');

const { GraphQLSchema,GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
    GraphQLString,
    
    GraphQLInt} =graphql;

//********************QUERYTYPES********************

const UserType = new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLID},
        fullName:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLInt},
        password:{type:GraphQLString},
        order:
            {type:new GraphQLList(OrderType),
                resolve(parent,args){
                return Order.find({id:parent.id})    
                }
        },
    })
});

const RestaurantType = new GraphQLObjectType({
    name:'Restaurant',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLInt},
        image:{type:GraphQLString},
        product:
            {type:new GraphQLList(ProductType),
            resolve(parent,args){
            return Product.find({id:parent.id})    
            }
            
        },
        rate:{type:GraphQLInt}
    })
});
const CategoryType = new GraphQLObjectType({
    name:'Category',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString}
    })
});

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        category:{type:GraphQLString},
        image:{type:GraphQLString},
        price:{type:GraphQLFloat}
    })
});
const ProductRestaurant = new GraphQLObjectType({
    name:'ProductRestaurant',
    fields:()=>({
        id:{type:GraphQLID},
        productId:{type:GraphQLID},
        restaurantId:{type:GraphQLID}
    })
});
const adressType = new GraphQLObjectType({
    name:'Adress',
    fields:()=>({
        user:
            {type:new GraphQLList(UserType),
                resolve(parent,args){
                return User.find({id:parent.id})    
                }
        },
        adress:{type:GraphQLString},
        city:{type:GraphQLString},
        state:{type:GraphQLString},
        country:{type:GraphQLString},
        zipCode:{type:GraphQLString},
    })
});

const CartType = new GraphQLObjectType({
    name:'Cart',
    fields:()=>({
       
        product:
            {type:new GraphQLList(ProductType),
                resolve(parent,args){
                return Product.find({id:parent.id})    
                }
        },
         user:{
            type:UserType,
            resolve(parent,args){
                return User.findById(parent.id)
            }
        },
    })
});

const CartItemType = new GraphQLObjectType({
    name:'CartItem',
    fields:()=>({
       product:
            {type:new GraphQLList(ProductType),
                resolve(parent,args){
                return Product.find({id:parent.id})    
                }
        },
         qty:{
            type:UserType,
            resolve(parent,args){
                return User.findById(parent.id)
            }
        },

    })
});

const OrderType = new GraphQLObjectType({
    name:'Order',
    fields:()=>({
        id:{type:GraphQLID},
        user:{
            type:UserType,
            resolve(parent,args){
                return User.findById(parent.id)
            }
        },
        qty:{type:GraphQLInt},
        total:{type:GraphQLFloat}, 
        product:{
            type:ProductType,
            resolve(parent,args){
                return Product.findById(parent.id)
            }
        },
    })
});

//********************MUTATION********************

const Mutation =new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //SIGNIN
        logIn:{
            type:UserType,
            args:{
                email:{type:new GraphQLNonNull (GraphQLString)},
                password:{type:new GraphQLNonNull (GraphQLString)}
            },
            resolve(parent,args){
                let user= new User({
                    email:args.email,
                    password:args.password

                });
                return user.save();
            }
        },
        //SIGNUP
        signUp:{
            type:UserType,
            args:{
                fullName:{type:new GraphQLNonNull (GraphQLString)},
                email:{type:new GraphQLNonNull (GraphQLString)},
                phone:{type:new GraphQLNonNull (GraphQLInt)},
                password:{type:new GraphQLNonNull (GraphQLString)}
            },
            resolve(parent,args){
                let user= new User({
                    fullName:args.fullName,
                    email:args.email,
                    phone:args.phone,
                    password:args.password

                });
                return user.save();
            }
        },
        //CREATERESTAURANT
        createRestaurant:{
            type:RestaurantType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                description:{type:new GraphQLNonNull(GraphQLString)},
                image:{type:GraphQLString},
            
            },
            resolve(parent,args){
                let restaurant= new Restaurant({
                    name:args.name,
                    description:args.description

                });
                return restaurant.save();
            }
        },
        //ADDPRODUCT
        addProduct:{
            type:ProductType,
            args:{
                name:{type:new GraphQLNonNull (GraphQLString)},
                category:{type:new GraphQLNonNull (GraphQLString)},
                image:{type:GraphQLString},
                price:{type: new GraphQLNonNull(GraphQLFloat)},
                restaurantId: {type : GraphQLID}

            },
            resolve(parent,args){
                let product= new Product({
                    name:args.name,
                    category:args.category,
                    image:args.image,
                    price:args.price

                });
                var productSave = product.save();
                const prodRes = new ProductRestaurant();
                prodRes.productId = product.id;
                prodRes.restaurantId =restaurantId;
                prodRes.save();
                //
                addProductRestaurant
                return productSave;
                
            }
        },
        // addProductRestaurant:{
        //     type:ProductRestaurant,
        //     args:{
        //     productId :{type:GraphQLID},
        //     restaurantId:{type:GraphQLID} 
        //     },
        //     resolve(parent,args){
        //         let productRestaurant = new ProductRestaurant({
        //             restaurantId:args.restaurantId,
        //             productId:args.productId
        //         });
        //         return productRestaurant.save();
        //     }

        // },
        //ADDORDER
        addOrder:{
            type:OrderType,
            args:{
                user:{type:new GraphQLNonNull (GraphQLString) },
                qty:{type:new GraphQLNonNull(GraphQLInt)},
                total:{type:new GraphQLNonNull(GraphQLFloat)},
                product:{type:new GraphQLNonNull(GraphQLString)}
            },

            resolve(parent,args){
                let order= new Order({
                    user:args.user,
                    qty:args.qty,
                    total:args.total,
                    product:args.product

                });
                return order.save();
            }
        },
       
    }
})

//********************ROOTQUERY********************

const RootQuery =new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               
                return User.findById(args.id);
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return User.find({});
            }
        },
       
        order:{
            type: OrderType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Order.findById(args.id);
            }
        } ,
        orders:{
            type: OrderType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Order.find({});
            }
        } ,    
        product:{
            type: ProductType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Product.findById();
            }
        },
        products:{
            type:new GraphQLList(ProductType),
            resolve(parent,args){
                return Product.find({});
             }
        },
        category:{
            type: new GraphQLList(CategoryType),
            resolve(parent,are){
                return Category.find()
            }
        },
        restaurant:{
            type: RestaurantType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Restaurant.findById(args.id);
            }
        },
        restaurants:{
            type:new GraphQLList(RestaurantType),
            resolve(parent,args){
                return Restaurant.find({});
            }
        },
       

    }           
});

//********************FINAL_SCHEMA********************

module.exports=new GraphQLSchema({
    query :RootQuery,
    mutation:Mutation
})