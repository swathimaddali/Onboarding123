using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Onboarding123.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using System;

namespace Onboarding123.Controllers

{
    [Route("[controller]")]
  
    public class SalesController : Controller
    {



  
            DataAccessLayer objsales= new DataAccessLayer();


            [HttpGet("[action]")]           
            public IEnumerable<Sales_new> Index()
            {

                return objsales.GetAllSales();
            }



        [HttpDelete]
        [Route("Delete/{id}")]

        public IEnumerable<Sales_new> Delete(int id)
        {
            // System.Diagnostics.Debug.WriteLine("inside CustomerController:::delete::" + objcustomer.DeleteCustomer(id));
            objsales.DeleteSale(id);
            return objsales.GetAllSales();


        }



        [HttpGet]
        [Route("Details/{id}")]
        public Sales_new Details(int id)
        {//we need to get current data along with custname,storename and productname
           //we need to add allcustnames and add all prodnames and all sorenames
            return objsales.GetSalesData(id);
        }

        [HttpPut]
        [Route("Edit/{id}")]

        public IEnumerable<Sales_new> Edit([FromForm]Sales_new sales)
        {
            // TODO: Add update logic here

            objsales.UpdateSales(sales) ;
            return objsales.GetAllSales();

        }


        [HttpGet]
        [Route("Create")]
        public Sales_new Create()
        {//we need to get current data along with custname,storename and productname
         //we need to add allcustnames and add all prodnames and all sorenames
            return objsales.GetSaleInfo();

        }


        //FromForm works  body: contentType: "application/x-www-form-urlencoded",
        [HttpPost]
        [Route("Create")]
        public IEnumerable<Sales_new> Create([FromForm] Sales_new sale)
        {
        
            objsales.AddSales(sale);
            return objsales.GetAllSales();

        }



    }
}