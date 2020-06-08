?<%@ WebHandler Language="C#" Class="mail" %>


using System;
using System.Web;
using System.Text;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Web.Security;
using System.Web.SessionState;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.IO;
using System.Web.Configuration;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Threading;
using System.Linq;
using System.Data.Sql;


public class mail : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {
        string name = context.Request.QueryString["name"].ToString();
        string email = context.Request.QueryString["email"].ToString();
        string message = context.Request.QueryString["message"].ToString();
        string sourcePage = context.Request.QueryString["sourcePage"].ToString();
        if (sourcePage == "")
        {
            sourcePage = "index.html";
        
        }
        string subject = "Enquiry for iRealities Technology";
        string to = "isales@iriplco.com";
        string userId = AddToDatabase(name, email, message, sourcePage);
        common.commonMail(name, email, message, sourcePage, userId, subject, to);        
        
        context.Response.ContentType = "text/plain";
        context.Response.Write("success");      
    }

    public string AddToDatabase(string name, string email, string message, string sourcePage)
    {
         try
        {
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connection"].ToString()))
            {
                conn.Open();
                //insert new section into table only if does not exist
                using (SqlCommand cmd = new SqlCommand("irealitiesContactUs_Create", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.Parameters.AddWithValue("@emailId", email);
                    cmd.Parameters.AddWithValue("@messageText",message);
                    cmd.Parameters.AddWithValue("@sUrl", sourcePage);
                    cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output; 
                    cmd.ExecuteNonQuery();
                    string id = cmd.Parameters["@id"].Value.ToString();
                    return id;
                }
            }
        }
        catch (Exception ex)
        {
            return ex.Message.ToString();
        }
    } 
    
    
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }      
}


 