export enum API {
  getNsiTypes = 'getNsiTypes',
  getChildProcessStatusesCountByUpdateTimeAndNsiTypeId = 'child-status/get-statuses-count',
  getGlobalProcessStatusesByUpdateTime = 'global-status/get-statuses',
  getGlobalProcessStatusesMainInfo = 'global-status/get-main-info',
  getChildProcessStatusMainInfo = 'child-status/get-main-info',
  getChildProcessStatusDsv3Info = 'child-status/get-dsv3-main-info',
  getChildProcessStatusFssInfo = 'child-status/get-fss-main-info',
  getEfsInfoByParams = 'getEfsInfoByParams',
  getEfsInfoWithStatus = 'getEfsInfoWithStatus',
  getFinalStatusesWithinTimeframeUsingPOST = 'global-status/get-final-statuses',
  getControlPoints = 'global-status/get-control-points',
}
