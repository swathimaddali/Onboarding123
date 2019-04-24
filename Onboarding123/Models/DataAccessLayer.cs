using Onboarding123.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding123.Models
{
    public class DataAccessLayer
    {

        masterContext db = new masterContext();

        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                return db.Customer.ToList();
            }
            catch
            {
                throw;
            }
        }


        public int DeleteCustomer(int id)
        {
            try
            {
                Customer cust = db.Customer.Find(id);
                db.Customer.Remove(cust);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //">SqlException: The DELETE statement conflicted with the REFERENCE constraint &quot;FK_customerId&quot;. The conflict occurred in database &quot;onborading&quot;, table &quot;dbo.Sales&quot;, column &#x27;Customerid&#x27;.&#xD;&#xA;The statement has been terminated.</h2>

     


        public IEnumerable<Customer> AddCustomer(Customer cust)
        {
            try
            {
             db.Customer.Add(cust);
             db.SaveChanges();

             return db.Customer.ToList();
            }
            catch
            {
                throw;
            }


        }



        public Customer GetCustomerData(int id)
        {
            try
            {
                Customer customer = db.Customer.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }



        public IEnumerable<Customer> UpdateCustomer(Customer cust)
        {
            try
            {
                db.Entry(cust).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                db.SaveChanges();

                return  db.Customer.ToList();
            }
            catch
            {
                throw;
            }


        }



        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }


        public int DeleteProduct(int id)
        {
            try
            {
                Product prod = db.Product.Find(id);
                db.Product.Remove(prod);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }



        public IEnumerable<Product> AddProduct(Product prod)
        {

            try
            {
                db.Product.Add(prod);
                db.SaveChanges();
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }

        public Product GetProductData(int id)
        {
            try
            {
                Product customer = db.Product.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }


       
        public IEnumerable<Product> UpdateProduct(Product pr)
        {
            try
            {
                db.Entry(pr).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                return db.Product.ToList(); 
            }
            catch
            {
                throw;
            }


        }


        public IEnumerable<Store> GetAllStores()
        {
            try
            {
                return db.Store.ToList();
            }
            catch
            {
                throw;
            }
        }


        public int DeleteStore(int id)
        {
            try
            {
                Store cust = db.Store.Find(id);
                db.Store.Remove(cust);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


        public IEnumerable<Store> AddStore(Store st)
        {
            try
            {
                db.Store.Add(st);
                db.SaveChanges();

                return db.Store.ToList();
            }
            catch
            {
                throw;
            }


        }
        /*
        public int AddStore(Store cust)
        {

            try
            {
                db.Store.Add(cust);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        */

        public Store GetStoreData(int id)
        {
            try
            {
                Store customer = db.Store.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }


        /*
        public int UpdateStore(Store cust)
        {
            try
            {
                db.Entry(cust).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }


        }
        */
        public IEnumerable<Store>   UpdateStore(Store st) 
        {
            try
            {
                db.Entry(st).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                db.SaveChanges();

                return db.Store.ToList();
            }
            catch
            {
                throw;
            }


        }
        public IEnumerable<Sales_new> GetAllSales()
        {
            try
            {
                // return db.Sales.ToList();
                List<Sales> sales = db.Sales.ToList();
                List<Sales_new> sales_new = new List<Sales_new>();


                foreach (var sale in sales)
                {
                    Sales_new s = new Sales_new();
                    // int custId = sale.Customerid;
                    int prodId = sale.Productid;
                    s.Storename = db.Store.Find(sale.Storeid).Name;
                    s.Customername = db.Customer.Find(sale.Customerid).Name;
                    s.Productname = db.Product.Find(sale.Productid).Name;
                    s.Id = sale.Id;

                    s.DateSold = sale.DateSold.ToShortDateString();
                    sales_new.Add(s);
                }

                return sales_new;


            }
            catch
            {
                throw;
            }
        }




        public int DeleteSale(int id)
        {
            try
            {
                Sales sale = db.Sales.Find(id);
                db.Sales.Remove(sale);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }


        }


        public Sales_new GetSalesData(int id)
        {
            //we need to get current data along with custname,storename and productname

            try
            {
                Sales sale = db.Sales.Find(id);

                Sales_new s = new Sales_new();
                s = GetListForSales(s);
                // int custId = sale.Customerid;
                int prodId = sale.Productid;
                s.Storename = db.Store.Find(sale.Storeid).Name;
                s.Customername = db.Customer.Find(sale.Customerid).Name;
                s.Productname = db.Product.Find(sale.Productid).Name;
                s.Id = sale.Id;
                s.DateSold = sale.DateSold.ToShortDateString();

                //we need to add allcustnames and add all prodnames and all storenames

                

                // s.store= db.Store.ToList();
                // s.customer = db.Customer.ToList();
                // s.product = db.Product.ToList();

                return s;
            }
            catch
            {
                throw;
            }
        }


        /*
         * id: this.state.salesdata.id,
                Productname: this.state.salesdata.productname,
                Customername: this.state.salesdata.customername,
                Storename: this.state.salesdata.storename,
                DateSold: this.state.salesdata.dateSold
         */



        public int UpdateSales(Sales_new sales)
        {
            try
            {
                Sales sale = invokeSale(sales);

                sale.Id = sales.Id;
                db.Entry(sale).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }


        }


        private Sales invokeSale(Sales_new s)
        {

            CultureInfo provider = CultureInfo.InvariantCulture;
            Sales sale = new Sales();
            //add custid and prod id and store id to this

          
            //var id = (from b in db.Store
            //              where b.Name == sales.Storename
            //            select b.Id).FirstOrDefault();
            sale.Storeid = db.Store.First(a => a.Name == s.Storename).Id;
            sale.Productid = db.Product.First(a => a.Name == s.Productname).Id;
            sale.Customerid = db.Customer.First(a => a.Name == s.Customername).Id;

            //db.Store.Where(b => b.Name == sales.Storename).);
            //sale.Storeid= db.Store.Find(sales.Storename).Id;
            // sale.Customerid = db.Customer.Find(sales.Customername).Id;
            // sale.Productid = db.Product.Find(sales.Productname).Id;
            sale.DateSold = DateTime.Parse(s.DateSold);

            return sale;


        }

        public int AddSales(Sales_new sales_new)
        {

            try
            {
                Sales sale = invokeSale(sales_new);
                db.Sales.Add(sale);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        private Sales_new GetListForSales(Sales_new s)
        {

        List<Customer> cust = db.Customer.ToList();

                foreach (var c in cust)
                {

                    string cname = c.Name;

        s.custNames.Add(cname);
                }


    List<Product> prod = db.Product.ToList();
                foreach (var c in prod)
                {
                    string cname = c.Name;
    s.prodNames.Add(cname);
                }

List<Store> st = db.Store.ToList();
                foreach (var c in st)
                {
                    string cname = c.Name;
s.storeNames.Add(cname);
                }

            return s;
}


        public Sales_new GetSaleInfo()
        {
            Sales_new s = new Sales_new();
            GetListForSales(s);
            return s;
        }
    }



}
 
 