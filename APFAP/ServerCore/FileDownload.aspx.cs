using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Data;

namespace APFAP.ServerCore
{
    public partial class FileDownload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string fileKey = "";
            string fileName = "";
            string path = "";
            fileKey = Request["FILEKEY"];
            //DB통신
            string dbServer = "ms1201.gabiadb.com";
            string dbPort = "1433";
            string dbName = "apfap";
            string dbUser = "masterplan";
            string dbPass = "apfap1234[]";
            string connectStr = "";
            SqlCommand cmd = new SqlCommand();
            StringBuilder BuildStr = new StringBuilder();

            SqlParameter param1 = new SqlParameter();
            SqlParameter param2 = new SqlParameter();
            SqlParameter param3 = new SqlParameter();
            param1.ParameterName = "@WORKGB";
            param1.Value = "GETFILE";
            param1.SqlDbType = SqlDbType.NVarChar;
            cmd.Parameters.Add(param1);
            param2.ParameterName = "@PROJECT_KEY";
            param2.Value = Request["PROJECT_KEY"];
            param2.SqlDbType = SqlDbType.NVarChar;
            cmd.Parameters.Add(param2);
            param3.ParameterName = "@FILEKEY";
            param3.Value = Request["FILEKEY"];
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
            cmd.CommandText = "sp_COMFILE";

            SqlDataAdapter adapter = new SqlDataAdapter();
            conn.Open();
            DataSet ds = new DataSet();
            adapter.SelectCommand = cmd;
            adapter.Fill(ds);
            conn.Close();
            DataTable dt = ds.Tables[0];
            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0) {
                    fileName = @ds.Tables[0].Rows[0][0].ToString() + @ds.Tables[0].Rows[0][1].ToString();
                    path = HttpContext.Current.Server.MapPath(".").Split(new string[] { @"\ServerCore" }, StringSplitOptions.None)[0] + string.Format(@"\UploadFiles\{0}\{1}", Request["E_USER"], ds.Tables[0].Rows[0][1].ToString());

                    Response.Clear();
                    Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(@ds.Tables[0].Rows[0][1].ToString(), System.Text.Encoding.GetEncoding("utf-8")).Replace("+", " "));
                    Response.TransmitFile(path);
                    Response.End();
                }           
            }
        }
    }
}