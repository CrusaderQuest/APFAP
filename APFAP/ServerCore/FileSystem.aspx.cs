using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Data.OleDb;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
using System.Security.AccessControl;

namespace APFAP.ServerCore
{
    public partial class FileSystem : System.Web.UI.Page
    {
        public string fileKey = "";
        private string GetFileName(string path, string fileSrc)
        {
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
                param6.ParameterName = "@PROJECT_KEY";
                param6.Value = Request["PROJECT_KEY"];
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
                    if (ds.Tables[1].Rows.Count > 0)
                        fileKey = @ds.Tables[1].Rows[0][0].ToString();
                }
            }
            return path + fileSrc;
        }
        private struct Files {
            public string fName;
            public int fSize;
            public string fUrl;
            public string mimetype;
        }
        Files file = new Files();

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
                        file = new Files();

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
                                file.mimetype = upFile.ContentType;
                                if (file.fName != "")
                                {
                                    try
                                    {
                                        if (!System.IO.Directory.Exists(path + Request["E_USER"] + "\\"))
                                        {
                                            System.IO.Directory.CreateDirectory(path + Request["E_USER"] + "\\");
                                        }
                                        //경로문제
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
                            json = "{'success': false, 'data' : '파일업로드실패: + " + message + "'}";
                            Response.Clear();
                            Response.Write(json);
                            Response.End();
                        }
                        else
                        {
                            string[] array = file.fName.Split('\\');
                            json = "{'success': true, 'data' : '" + array[8]+ "', 'fileKey' :" + "'"+ fileKey+ "'" + "}";
                            Response.Clear();
                            Response.Write(json);
                            Response.End();
                        }
                    }
                }
            }
            else if (TYPE == "CLEAR")
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
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        fileName = @ds.Tables[0].Rows[0][0].ToString() + @ds.Tables[0].Rows[0][1].ToString();
                        path = HttpContext.Current.Server.MapPath(".").Split(new string[] { @"\ServerCore" }, StringSplitOptions.None)[0] + string.Format(@"\UploadFiles\{0}\{1}", Request["E_USER"], ds.Tables[0].Rows[0][1].ToString());
                        string msg = "";
                        //Response.Clear();
                        //Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(@ds.Tables[0].Rows[0][1].ToString(), System.Text.Encoding.GetEncoding("utf-8")).Replace("+", " "));
                        //Response.TransmitFile(path);
                        //Response.End();
                        try
                        {
                            //서버폴더 파일 삭제
                            if (File.Exists(path))
                            {
                                File.Delete(path);
                            }

                            //DB 데이터 삭제
                            //SqlParams sp_DelFile = new SqlParams("sp_ComFile", "DelFile");
                            //sp_DelFile.AddParam("FILEKEY", fileKey);

                            //DataSet ds = SqlProcedure.ExecuteDataset(sp_DelFile);
                            SqlCommand cmd1 = new SqlCommand();
                            StringBuilder BuildStr1 = new StringBuilder();

                            SqlParameter param11 = new SqlParameter();
                            SqlParameter param22 = new SqlParameter();
                            SqlParameter param33 = new SqlParameter();
                            string connectStr1 = "";
                            param11.ParameterName = "@WORKGB";
                            param11.Value = "CLEARFILE";
                            param11.SqlDbType = SqlDbType.NVarChar;
                            cmd1.Parameters.Add(param11);
                            param22.ParameterName = "@PROJECT_KEY";
                            param22.Value = Request["PROJECT_KEY"];
                            param22.SqlDbType = SqlDbType.NVarChar;
                            cmd1.Parameters.Add(param22);
                            param33.ParameterName = "@FILEKEY";
                            param33.Value = Request["FILEKEY"];
                            param33.SqlDbType = SqlDbType.NVarChar;
                            cmd1.Parameters.Add(param33);

                            BuildStr1.Append("Data Source=" + dbServer + "," + dbPort + ";");
                            BuildStr1.Append("Initial Catalog=" + dbName + ";");
                            BuildStr1.Append("User ID=" + dbUser + ";");
                            BuildStr1.Append("Password=" + dbPass + ";");
                            connectStr1 = BuildStr.ToString();

                            SqlConnection conn1 = new SqlConnection(connectStr1);
                            cmd1.Connection = conn1;
                            cmd1.CommandType = CommandType.StoredProcedure;
                            cmd1.CommandText = "sp_COMFILE";

                            SqlDataAdapter adapter1 = new SqlDataAdapter();
                            conn1.Open();
                            DataSet ds1 = new DataSet();
                            adapter1.SelectCommand = cmd1;
                            adapter1.Fill(ds1);
                            conn1.Close();
                            DataTable dt1 = ds1.Tables[0];

                            if (ds1 != null)
                            {
                                if (ds1.Tables[0].Rows.Count > 0)
                                {
                                    if (ds1.Tables[1].Rows[0][0].ToString() == "X")
                                    {
                                        msg = ds1.Tables[0].Rows[0][1].ToString();
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            msg = ex.Message;
                        }
                    }
                }
            }

        }
    }
}