Suppose you want to run some of these tests in a development pipeline that's independent from the backend development pipeline. Explain how you would approach this:
- What techniques, frameworks or tools you might think of using;
- How you would go about integrating this framework with a CI pipeline;


#### 1.In order to achieve that , will mock the post api call( by wiremock or flask) of https://fierce-gorge-81903.herokuapp.com/api
    So , on providing different set of requests , different response  will be provided . 

####2.Will add different kind of response on providing different post code .like 
    "errorMessage": "Invalid Address"
    "errorMessage": "Problem with Geocode API: Unable to find that address."
  
####3.Also will check for what happens on UI when 443 status code is given by weather api 

####4.Create a docker.compose.yml file which contains docker image for this mocked service 

####5 Docker image for running the tests will also be included in it ( providing the steps : copy the framework , install dependencies, run test)

####6.In order to integrate this into pipeline , once the new code is pushed . Code will be compiled and other stages will run ( like unit tests etc ) 
    Will be running the UI tests by adding one step : Running UI tests 

    Bring up the docker container 
    Run the tests inside the docker container 
    Copy the report in the pipeline once tests are completed
    
    If tests fails, mark the build is failed as continue onto next step if any or mark the build as passed 

