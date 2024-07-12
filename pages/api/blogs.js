export default async function handle(req,res) {

    const {method} = req;
    console.log(method) 
    if(method==='POST'){
        console.log('post method')

        const {title,
          } = req.body;
        
        //   const productDoc = await Product.create({
        //     title,
        //     description,
        //     price,
        //     discountedPrice,
        //     images,
        //     category,
        //     properties,
        //     stockQuantity,
        //     sku
        //   });
        
          res.json("done");
        
    
    }
}