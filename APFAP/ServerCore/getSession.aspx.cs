using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace APFAP.ServerCore
{
    public partial class getSession : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string response = "";
            try
            {
                response = Session["USER_NO"].ToString();
                response += '※';
                response += Session["USER_NM"].ToString();
                Response.Write(response);
            }
            catch
            {
                Response.Write("NSESSION");
            }
            Response.End();
        }
    }
}