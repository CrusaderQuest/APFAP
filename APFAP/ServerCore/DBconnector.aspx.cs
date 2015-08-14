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
    public partial class DBconnector : System.Web.UI.Page
    {
        public Dictionary<string, string> paramString = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            string dbServer = "ms1201.gabiadb.com";
            string dbPort = "1433";
            string dbName = "apfap";
            string dbUser = "masterplan";
            string dbPass = "apfap1234[]";
            StringBuilder BuildStr = new StringBuilder();
            string connectStr = "";
            string returnJsonStr = "";
            string procedureName = Request["procedureName"] == null ? "" : Request["procedureName"].ToString();
            string procedureSection = Request["procedureSection"] == null ? "" : Request["procedureSection"].ToString();
            string procedureParams = Request["params"] == null ? "" : Request["params"].ToString();

            string[] itemList = procedureParams.Split(new string[] { "|" }, StringSplitOptions.None);
            if (itemList.Length > 0)
            {
                for (int i = 0; i < itemList.Length; i++)
                {
                    string[] pr = itemList[i].Split(new string[] { "※" }, StringSplitOptions.None);
                    if (pr.Length == 2 && pr[0] != "")
                    {
                        paramString.Add(pr[0], pr[1]);
                    }
                }
            }
            BuildStr.Append("Data Source=" + dbServer + "," + dbPort + ";");
            BuildStr.Append("Initial Catalog=" + dbName + ";");
            BuildStr.Append("User ID=" + dbUser + ";");
            BuildStr.Append("Password=" + dbPass + ";");
            connectStr = BuildStr.ToString();
            SqlCommand cmd = new SqlCommand();
            SqlConnection conn = new SqlConnection(connectStr);
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = procedureName;

            SqlParameter param = new SqlParameter();
            if (procedureSection != "")
            {
                param.ParameterName = "@WORKGB";
                param.Value = procedureSection;
                param.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param);
            }

            foreach (string key in paramString.Keys)
            {
                param = new SqlParameter();
                param.ParameterName = "@" + key;
                param.Value = paramString[key];
                param.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param);
            }

            SqlDataAdapter adapter = new SqlDataAdapter();

            try
            {
                conn.Open();
                DataSet ds = new DataSet();
                adapter.SelectCommand = cmd;
                adapter.Fill(ds);
                conn.Close();

                if (ds.Tables.Count == 0)
                {
                    ds.Tables.Add(new DataTable());
                }

                //return ds;
                returnJsonStr = string.Empty;
                foreach (DataTable dt in ds.Tables)
                {
                    if (string.IsNullOrEmpty(returnJsonStr))
                    {
                        returnJsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None);
                    }
                    else
                    {
                        returnJsonStr += "|" + Newtonsoft.Json.JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None);
                    }
                }
                Response.Write(returnJsonStr);
                Response.End();
            }
            catch
            {
                conn.Close();

                DataSet ds = new DataSet();
                ds.Tables.Add(new DataTable());
                //return ds;
                returnJsonStr = string.Empty;
                foreach (DataTable dt in ds.Tables)
                {
                    if (string.IsNullOrEmpty(returnJsonStr))
                    {
                        returnJsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None);
                    }
                    else
                    {
                        returnJsonStr += "|" + Newtonsoft.Json.JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None);
                    }
                }
                Response.Write(returnJsonStr);
                Response.End();
            }
        }
    }
}