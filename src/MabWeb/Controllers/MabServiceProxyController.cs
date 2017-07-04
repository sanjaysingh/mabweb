using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using MabWeb.Utilities;
using System.Net.Http.Headers;
using System.Net;

namespace MabWeb.Controllers
{
    [Route("mabservice/{*url}")]
    public class MabServiceProxyController : Controller
    {
        private readonly ILogger logger;
        private readonly AppSettings appsettings;

        public MabServiceProxyController(ILogger<MabServiceProxyController> logger, IOptions<AppSettings> appsettings)
        {
            this.logger = logger;
            this.appsettings = appsettings.Value;
        }
        
        [HttpPost]
        [HttpGet]
        [HttpPut]
        [HttpDelete]
        public async Task Execute(string url)
        {
            try
            {
                logger.LogInformation($"Begin MabServiceProxyController.Execute with URL '{url}' and HttpMethod '{this.Request.Method}'");
                var requestMessage = new HttpRequestMessage();
                var requestMethod = this.Request.Method;
                if (!HttpMethods.IsGet(requestMethod) && !HttpMethods.IsDelete(requestMethod))
                {
                    var streamContent = new StreamContent(this.Request.Body);
                    requestMessage.Content = streamContent;
                }

                foreach (var header in this.Request.Headers)
                {
                    if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()) && requestMessage.Content != null)
                    {
                        requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                    }
                }
                logger.LogInformation($"Adding function key header with starting value {string.Join("", this.appsettings.AppKey.Take(5))}");
                requestMessage.Headers.TryAddWithoutValidation("x-functions-key", this.appsettings.AppKey);
                var uriString = $"{this.appsettings.ApiUrl}/{url}{this.Request.QueryString}";
                logger.LogInformation($"Service request URL is {uriString}");
                requestMessage.RequestUri = new Uri(uriString);
                requestMessage.Method = new HttpMethod(this.Request.Method);
                requestMessage.Headers.Host = $"{requestMessage.RequestUri.Host}:{requestMessage.RequestUri.Port}";
                requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpClient client = new HttpClient(new HttpClientHandler());
                using (var responseMessage = await client.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead, this.HttpContext.RequestAborted))
                {
                    this.Response.StatusCode = (int)responseMessage.StatusCode;
                    foreach (var header in responseMessage.Headers)
                    {
                        this.Response.Headers[header.Key] = header.Value.ToArray();
                    }

                    foreach (var header in responseMessage.Content.Headers)
                    {
                        this.Response.Headers[header.Key] = header.Value.ToArray();
                    }
                    this.Response.Headers.Remove("transfer-encoding");
                    await responseMessage.Content.CopyToAsync(this.Response.Body);
                }
            }
            catch(Exception ex)
            {
                logger.LogError(new EventId(), ex, ex.Message);
                this.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }
    }
}
