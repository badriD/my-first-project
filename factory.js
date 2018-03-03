'use strict';

angular.module('com.module.organizations').factory('organizationsFactory', ['$http', 'appConfig', '$cookies', function ($http, appConfig, $cookies) {
  var userId = $cookies.userId;

  function getOrganizations (){
    return $http({
      method: 'GET',
      url: appConfig.apiUrl + '/organizations ',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function createOrganization (data) {
    return $http({
      method: 'POST',
      url: appConfig.apiUrl + '/organizations',
      data: data
    });
  }

  function updateOrganization(data) {
    var id = data._id;
    delete data._id;
    return $http({
      method: 'PUT',
      url: appConfig.apiUrl + '/organizations/' + id,
      data: data
    });
  }

  function getAssets(offset, count, label) {
    var maxValue = (offset + count - 1);
    return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/asset/by/label/' + label + '/' + offset + '/' + maxValue
    });
  }

  function createAsset(file) {
    file.append('user_id', $cookies.userId || appConfig.userId);
    return $http({
      method: 'POST',
      url: appConfig.apiUrl + '/asset/put',
      headers: {
        'Content-Type': undefined
      },
      transformRequest: angular.identity,
      data: file
    })
  }

  function deleteAsset(data) {
    data.user_id = $cookies['userId'] || appConfig.userId;
  return $http({
      method: 'POST',
      url: appConfig.apiUrl + '/asset/delete',
      data: data
    });
  }

  return {
    getOrganizations: getOrganizations,
    createOrganization: createOrganization,
    updateOrganization: updateOrganization,
  }


}])


  .service('organizationsService', function () {
    var orgData = {};
    function setOrganizationData (data) {
      console.log(data);
      orgData = data;
    };
    function getOrganizationData () {
        return orgData
    }
    return {
      setOrganizationData: setOrganizationData,
      getOrganizationData: getOrganizationData
    }
  });
