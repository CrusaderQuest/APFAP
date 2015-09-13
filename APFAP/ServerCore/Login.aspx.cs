using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Text;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft;

namespace APFAP.ServerCore
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string USERID = Request["USERID"] == null ? "" : Request["USERID"].ToString();
            string USERPW = Request["USERPW"] == null ? "" : Request["USERPW"].ToString();

            string connectStr = "";
            
            string dbServer = "ms1201.gabiadb.com";
            string dbPort = "1433";
            string dbName = "apfap";
            string dbUser = "masterplan";
            string dbPass = "apfap1234[]";

            SqlCommand cmd = new SqlCommand();
            StringBuilder BuildStr = new StringBuilder();

            SqlParameter param1 = new SqlParameter();
            SqlParameter param2 = new SqlParameter();
            SqlParameter param3 = new SqlParameter();
            param1.ParameterName = "@WORKGB";
            param1.Value = "LOGIN";
            param1.SqlDbType = SqlDbType.NVarChar;
            cmd.Parameters.Add(param1);

            param2.ParameterName = "@USERID";
            param2.Value = USERID;
            param2.SqlDbType = SqlDbType.NVarChar;
            cmd.Parameters.Add(param2);

            param3.ParameterName = "@USERPW";
            param3.Value = GetMD5Hash(USERPW);
            param3.SqlDbType = SqlDbType.NVarChar;
            cmd.Parameters.Add(param3);

            BuildStr.Append("Data Source=" + dbServer + "," + dbPort + ";");
            BuildStr.Append("Initial Catalog=" + dbName + ";");
            BuildStr.Append("User ID=" + dbUser + ";");
            BuildStr.Append("Password=" + dbPass + ";");
            connectStr = BuildStr.ToString();

            SqlConnection conn = new SqlConnection(connectStr);
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_COMAUTH";

            SqlDataAdapter adapter = new SqlDataAdapter();
            conn.Open();
            DataSet ds = new DataSet();
            adapter.SelectCommand = cmd;
            adapter.Fill(ds);
            conn.Close();

            if (ds.Tables.Count != 2)
            {

                //return ds;
                Response.Write("X");
                Response.End();
                return;
            }
            DataTable dt = ds.Tables[0];
            if (dt.Rows[0]["USER_KEY"].ToString() == "NID")
            {
                Response.Write("NID");
            }
            else if (dt.Rows[0]["USER_KEY"].ToString() == "NPW")
            {
                Response.Write("NPW");
            }
            else
            {
                try
                {
                    Session["USER_NO"] = dt.Rows[0]["USER_KEY"].ToString();
                }
                catch
                {
                    Session.Add("USER_NO", dt.Rows[0]["USER_KEY"].ToString());
                }
                try
                {
                    Session["USER_NM"] = dt.Rows[0]["USER_NM"].ToString();
                }
                catch
                {
                    Session.Add("USER_NM", dt.Rows[0]["USER_NM"].ToString());
                }
                Response.Write("O");
            }
            //return ds;
            Response.End();

        }
        //출저 : http://uwooto.blogspot.kr/2010/11/c-md5.html
        public string GetMD5Hash(string input)
        {
        System.Security.Cryptography.MD5CryptoServiceProvider x = new System.Security.Cryptography.MD5CryptoServiceProvider();
        byte[] bs = System.Text.Encoding.UTF8.GetBytes(input);
        bs = x.ComputeHash(bs);
        System.Text.StringBuilder s = new System.Text.StringBuilder();
        foreach (byte b in bs)
        {
            s.Append(b.ToString("x2").ToLower());
        }
        string password = s.ToString();
        return password;
        }
    }
}