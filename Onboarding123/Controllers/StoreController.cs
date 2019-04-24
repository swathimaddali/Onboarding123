using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Onboarding123.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;



namespace Onboarding123.Controllers
{

    [Route("[controller]")]

    public class StoreController : Controller
    {


        DataAccessLayer objproduct = new DataAccessLayer();


        [HttpGet("[action]")]

        //Product/Index
        public IEnumerable<Store> Index()
        {

            return objproduct.GetAllStores();
        }






        [HttpGet]
        [Route("Details/{id}")]
        public Store Details(int id)
        {
            return objproduct.GetStoreData(id);
        }

        [HttpPut]
        [Route("Edit/{id}")]

        public IEnumerable<Store> Edit([FromForm]Store product)
        {
      
            return objproduct.UpdateStore(product) ;

              

        }





        //FromForm works  body: contentType: "application/x-www-form-urlencoded",
        [HttpPost]
        [Route("Create")]
        public IEnumerable<Store> Create([FromForm] Store product)
        {
            return objproduct.AddStore(product);

             

        }


        //https://localhost:44394/Customer/Delete/1
        [HttpDelete]
        [Route("Delete/{id}")]

        public IEnumerable<Store> Delete(int id)
        {
            // System.Diagnostics.Debug.WriteLine("inside CustomerController:::delete::" + objcustomer.DeleteCustomer(id));

            objproduct.DeleteStore(id) ;
            return objproduct.GetAllStores();

        }



    }
}