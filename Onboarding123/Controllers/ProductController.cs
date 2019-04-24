using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Onboarding123.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;



namespace Onboarding123.Controllers
{

    [Route("[controller]")]
    public class ProductController : Controller
    {


        DataAccessLayer objproduct = new DataAccessLayer();


        [HttpGet("[action]")]

        //Product/Index
        public IEnumerable<Product> Index()
        {
        
            return objproduct.GetAllProducts();
        }






        [HttpGet]
        [Route("Details/{id}")]
        public Product Details(int id)
        {
            return objproduct.GetProductData(id);
        }

        [HttpPut]
        [Route("Edit/{id}")]

        public IEnumerable<Product> Edit([FromForm]Product product)
        {
           

            return objproduct.UpdateProduct(product);

     
        }


        
      

        //FromForm works  body: contentType: "application/x-www-form-urlencoded",
        [HttpPost]
        [Route("Create")]
        public IEnumerable<Product> Create([FromForm] Product product)
        {
            
            return objproduct.AddProduct(product);

               


        }


        //https://localhost:44394/Customer/Delete/1
        [HttpDelete]
        [Route("Delete/{id}")]

        public IEnumerable<Product> Delete(int id)
        {
            // System.Diagnostics.Debug.WriteLine("inside CustomerController:::delete::" + objcustomer.DeleteCustomer(id));

            objproduct.DeleteProduct(id);
                return objproduct.GetAllProducts();
        }



    }
}