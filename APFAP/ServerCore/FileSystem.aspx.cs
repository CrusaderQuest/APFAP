using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Data.OleDb;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

namespace APFAP.ServerCore
{
    public partial class FileSystem : System.Web.UI.Page
    {
        private string GetFileName(string path, string fileSrc)
        {
            string upfileName = "";
            if (fileSrc != "")
            {
                path += Request["E_USER"] + "\\";
                string fileName = Path.GetFileNameWithoutExtension(fileSrc);
                string fileExt = Path.GetExtension(fileSrc);

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
                SqlParameter param4 = new SqlParameter();
                SqlParameter param5 = new SqlParameter();
                SqlParameter param6 = new SqlParameter();
                param1.ParameterName = "@WORKGB";
                param1.Value = "ADDFILE";
                param1.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param1);
                param2.ParameterName = "@FILENAME";
                param2.Value = path;
                param2.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param2);
                param3.ParameterName = "@FILEEXT";
                param3.Value = fileSrc;
                param3.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param3);
                param4.ParameterName = "@E_USER";
                param4.Value = Request["E_USER"];
                param4.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param4);
                param5.ParameterName = "@E_FORM";
                param5.Value = Request["FORMNAME"];
                param5.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param5);
                param6.ParameterName = "@E_FORM";
                param6.Value = Request["FORMNAME"];
                param6.SqlDbType = SqlDbType.NVarChar;
                cmd.Parameters.Add(param6);

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
                    if (ds.Tables[0].Rows.Count > 0)
                        upfileName = ds.Tables[0].Rows[0][0].ToString();
                }
            }
            return upfileName;
        }
        private struct File {
            public string fName;
            public int fSize;
            public string fUrl;
        }
        File file = new File();

        protected void Page_Load(object sender, EventArgs e)
        {
            string TYPE = Request["TYPE"] == null ? "" : Request["TYPE"].ToString();
            string message = "";
            string json = "";
            if (TYPE == "UPLOAD")
            {
                HttpFileCollection files = Request.Files;
                if (files != null)
                {
                    HttpPostedFile upFile = files[0];
                    if (upFile != null)
                    {
                        long upFileSizeMax = 4096;
                        file = new File();

                        //파일정보 가져오기
                        string fileName = Path.GetFileName(upFile.FileName);
                        file.fSize = upFile.ContentLength;

                        if (file.fSize > 0)
                        {
                            if (file.fSize < upFileSizeMax * 10240)
                            {
                                foreach (char ch in " ,~!#%^&+-*/:;?|\"'\r\n")
                                {
                                    fileName = fileName.Replace(ch.ToString(), "");

                                }
                                string path = HttpContext.Current.Server.MapPath(".").Split(new string[] { @"\ServerCore" }, StringSplitOptions.None)[0] + @"\UploadFiles\";
                                file.fName = GetFileName(path, fileName);
                                if (file.fName != "")
                                {
                                    try
                                    {
                                        upFile.SaveAs(file.fName);
                                    }
                                    catch (Exception)
                                    {
                                        message = "업로드 실패";
                                    }
                                }
                                else
                                {
                                    message = "파일이름 없음";
                                }
                            }
                            else
                            {
                                message = "업로드가능한 파일 최대용량 초과";
                            }
                        }
                        else
                        {
                            message = "파일 용량이 없음";
                        }
                        if (message != "")
                        {
                            json = "{'success': true, 'data' : '파일업로드성공'}";
                        }
                        else
                        {
                            json = "{'success': false, 'data' : '파일업로드실패: + " + message + "'}";
                        }
                        Response.Clear();
                        Response.Write(json);
                        Response.End();
                    }
                }
            }
            else { 
            
            }

        }
    }
}