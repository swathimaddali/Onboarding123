using System;
using System.Collections.Generic;

namespace Onboarding123.Models
{
    public partial class Sales_new
    {
        public int Id { get; set; }       
        public String DateSold { get; set; }
        public string Productname { get; set; }
        public string Customername { get; set; }
        public string Storename { get; set; }

       public List<string> storeNames = new List<string>();
       public List<string> prodNames = new List<string>();
        public List<string> custNames = new List<string>();

        // public IEnumerable<Customer> customer = new List<Customer>();
        // public IEnumerable<Store> store = new List<Store>();
        // public IEnumerable<Product> product = new List<Product>();



    }
}
