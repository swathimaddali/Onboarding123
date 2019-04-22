using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Onboarding123.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;



namespace Onboarding123.Controllers
{

    [Route("[controller]")]
    public class CustomerController : Controller
    {


        DataAccessLayer objcustomer = new DataAccessLayer();

        [HttpGet("[action]")]

        //Customer/Index
        public IEnumerable<Customer> Index()
        {
            System.Console.WriteLine("inside CustomerController:::Index");
            return objcustomer.GetAllCustomers();
        }



        //https://localhost:44394/Customer/Delete/1
        [HttpDelete]
        [Route("Delete/{id}")]
       
        public JsonResult Delete(int id)
        {
            // System.Diagnostics.Debug.WriteLine("inside CustomerController:::delete::" + objcustomer.DeleteCustomer(id));

            if (objcustomer.DeleteCustomer(id) == 1)
                return Json(new { success = true, responseText = "succesfully deleted" });
            else return Json(new { success = false, responseText = "failed" });

        }

        
        // GET https://localhost:44394/Customer/Details/2 
        // GET: Customer/Details/5





        




        [HttpGet]
        [Route("Details/{id}")]
        public Customer Details(int id)
        {
            return objcustomer.GetCustomerData(id);
        }

        [HttpPut]
        [Route("Edit/{id}")]

        public JsonResult Edit([FromForm]Customer customer)
        {
            // TODO: Add update logic here

            if (!ModelState.IsValid)
            {
                return Json(new { success = false, responseText = "failed" });
            }

            if (objcustomer.UpdateCustomer(customer) == 1)

                return Json(new { success = true, responseText = "succesfully updated" });
            return Json(new { success = false, responseText = "failed" });

        }


        //Customer/Edit

        /*
    // POST: Customer/Edit/5
    [HttpPut]
    [Route("Edit/{id}")]

    public int Edit(Customer customer)
    {
         // TODO: Add update logic here

            return objcustomer.UpdateCustomer(customer);

    }
    /*
    */
     /*   [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit(TblEmployee employee)
        {
            return objemployee.UpdateEmployee(employee);
        }
        */


        /*
        public class CustomerController : Controller
        {
            // GET: Customer
            public ActionResult Index()
            {
                return View();
            }

           

            // GET: Customer/Create
            public ActionResult Create()
            {
                return View();
            }
            */
        //POST: Customer/Create
        //ublic JsonResult Create(Customer cust)

            /*
       [HttpPost]    
        [Route("Create")]
      public JsonResult Create(string name,string add)
        {

            Customer customer = new Customer
            {
                Name = name,
                Address = add,


            };
            
   
            if( objcustomer.AddCustomer(customer) ==1)
            return Json(new { success = true, responseText = "succesfully created" });
            else return Json(new { success = false, responseText = "failed" });

        }
        */
        //FromForm works  body: contentType: "application/x-www-form-urlencoded",
        [HttpPost]
        [Route("Create")]
        public JsonResult Create([FromForm] Customer product)
        {
            if (!ModelState.IsValid)
            {
                 return Json( new { success = false, responseText = "failed" });
            }

           if( objcustomer.AddCustomer(product)==1)

            return Json(new { success = true, responseText = "succesfully created" });
            return Json(new { success = false, responseText = "failed" });


        }



        [HttpPost]
        [Route("CreateDummy")]
        public JsonResult CreateDummy([FromForm] Customer c)
        {
            
              

         return Json(new { success = true, responseText = "succesfully created" });
          


        }




        /*
            // GET: Customer/Edit/5
            public ActionResult Edit(int id)
            {
                return View();
            }

           
            // GET: Customer/Delete/5
            public ActionResult Delete(int id)
            {
                return View();
            }

            // POST: Customer/Delete/5
            [HttpPost]
            [ValidateAntiForgeryToken]
            public ActionResult Delete(int id, IFormCollection collection)
            {
                try
                {
                    // TODO: Add delete logic here

                    return RedirectToAction(nameof(Index));
                }
                catch
                {
                    return View();
                }
            }
        }*/
    }
}