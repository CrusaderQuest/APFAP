using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace APFAP.ServerCore
{
    public partial class setSession : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string response = "0";
            try
            {
                Session["PROJECT_KEY"] = Request["PROJECT_KEY"];
            }
            catch
            {
                Session.Add("PROJECT_KEY", Request["PROJECT_KEY"]);
            }
            try
            {
                Session["MASTER_TF"] = Request["MASTER_TF"];
            }
            catch
            {
                Session.Add("MASTER_TF", Request["MASTER_TF"]);
            }
            try
            {
                Session["READ_ONLY"] = Request["READ_ONLY"];
            }
            catch
            {
                Session.Add("READ_ONLY", Request["READ_ONLY"]);
            }
            Response.Write(response);
            Response.End();
        }
    }
}