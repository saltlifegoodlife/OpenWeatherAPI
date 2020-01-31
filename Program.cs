using System;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace OpenWeatherAPI
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Please enter zip code for local weather.");
            string zipInput = Console.ReadLine();
            
            
            Console.WriteLine("If outside the US please enter country, otherwise hit enter.");
            string country = Console.ReadLine();

            country.ToLower();
            if (country == "us" || country == "usa" || country == null || country == "")
            {
                country = "us";
            }

            

            string url = "http://api.openweathermap.org/data/2.5/weather?";
            string apiKeyDeclaration = "zip=";

            string key = File.ReadAllText("appsettings.Debug.json");
            JObject jObject = JObject.Parse(key);
            JToken token = jObject["WeatherApi"];
            string apiKey = token.ToString();


            string feedType = $"{zipInput},{country}&APPID=";

            string apiCall = $"{url}{apiKeyDeclaration}{feedType}{apiKey}";

            var httpRequest = new HttpClient();

            Task<string> response = httpRequest.GetStringAsync(apiCall);
            
            ////pulled current temp
            string newResponse = response.Result;
            JObject jObject1 = JObject.Parse(newResponse);
            JToken temp = jObject1["main"]["temp"];
            var newTemp = temp.ToString();
            double num = Convert.ToDouble(newTemp);
            var num1 = (num * 1.8) - 459.67;
            var currTemp = Convert.ToInt32(num1);

            ////pulled city
            JObject jObject2 = JObject.Parse(newResponse);
            JToken cityToken = jObject2["name"];
            var city = cityToken.ToString();

            Console.WriteLine($"The current temp for {city} is {currTemp}.");
        }
    }
}
