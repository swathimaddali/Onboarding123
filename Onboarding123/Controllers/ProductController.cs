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

        public JsonResult Edit([FromForm]Product product)
        {
            // TODO: Add update logic here

            if (!ModelState.IsValid)
            {
                return Json(new { success = false, responseText = "failed" });
            }

            if (objproduct.UpdateProduct(product) == 1)

                return Json(new { success = true, responseText = "succesfully updated" });
            return Json(new { success = false, responseText = "failed" });

        }


        
      

        //FromForm works  body: contentType: "application/x-www-form-urlencoded",
        [HttpPost]
        [Route("Create")]
        public JsonResult Create([FromForm] Product product)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, responseText = "failed" });
            }

            if (objproduct.AddProduct(product) == 1)

                return Json(new { success = true, responseText = "succesfully created" });
            return Json(new { success = false, responseText = "failed" });


        }


        //https://localhost:44394/Customer/Delete/1
        [HttpDelete]
        [Route("Delete/{id}")]

        public JsonResult Delete(int id)
        {
            // System.Diagnostics.Debug.WriteLine("inside CustomerController:::delete::" + objcustomer.DeleteCustomer(id));

            if (objproduct.DeleteProduct(id) == 1)
                return Json(new { success = true, responseText = "succesfully deleted" });
            else return Json(new { success = false, responseText = "failed" });

        }



    }
}