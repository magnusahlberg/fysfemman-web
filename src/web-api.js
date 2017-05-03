import { HttpClient } from 'aurelia-fetch-client';
import environment from './environment'

export class WebAPI {
  client = new HttpClient();
  isRequesting = false;

  constructor() {
    this.client.configure(config => {
  config
    .useStandardConfiguration()
    .withBaseUrl( environment.baseurl + '/api/v1')
    .withDefaults({
      headers: {
        'X-Requested-With': 'Fetch'
      }
    })
    .withInterceptor({
      request(request) {
          if (localStorage.getItem('token') != null) {
            request.headers.append('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':'));
          }
          return request;
      }
    });
});
  }

  getActivityList() {
    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.client.fetch('/activities')
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(error => reject(error));
      this.isRequesting = false;
    });
  }

  getActivityTypes() {
    this.isRequesting = true;

    return new Promise((resolve, reject)=> {
      this.client.fetch('/activityTypes')
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(error => reject(error));
      this.isRequesting = false;
    });
  }

  addActivity(activity) {
    this.isRequesting = true;

    console.log("Will add:");
    console.log(activity);
    return new Promise((resolve, reject) => {
      this.client.fetch('/activities', {
        method: 'post',
        body: JSON.stringify(activity),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(error => reject(error));
      this.isRequesting = false;
    });
  }

  getCode(mobile) {
    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      let url = '/login/' + mobile;
      console.log("Fetching code: " + url);

      this.client.fetch(url)
      .then(response => {
        console.log("Fetched code!");
        resolve(true);
      })
      .catch(error => {
        console.log("Error: " + error.message);
        reject(error) });
      this.isRequesting = false;
    });
  }

  login(mobile, code) {
    this.isRequesting = true;

    let auth = {code: code}

    return new Promise((resolve, reject) => {
      this.client.fetch('/login/' + mobile, {
        method: 'post',
        body: JSON.stringify(auth),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => { return response.json() })
      .then(data => {
        console.log(data);
        resolve(data["token"]);
      })
      .catch(error => reject(error));
      this.isRequesting = false;
    });
  }
}
