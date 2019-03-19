export const GlobalConst = {
  GooglePlacesKey: 'AIzaSyB1dYkTTghEclBNtzgfMKMwwHXJoZ4-pRI'
};

// error handler contstants
export enum StatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InteralServerError = 500
}

export const StatusMessage = {
  Ok: 'OK (Deleted, GET , UPDATED)',
  Created: 'Created (CREATED)',
  BadRequest: 'Bad Request (MISSING REQUIED INFO)',
  Unauthorized: 'Unauthorized (AUTHENTICATION REQUIRED)',
  Forbidden: 'Forbidden (YOU ARE NOT AUTHORIZED TO ACCESS)',
  NotFound: '404 Not Found (RECORD NOT FOUND)',
  InteralServerError: '500 Internal Server Error (DATABASE ERROR, CONNECTION,MISC SERVER ISSUE)'
};





