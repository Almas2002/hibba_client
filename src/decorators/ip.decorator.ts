import { createParamDecorator } from '@nestjs/common';
import * as requestIP from 'request-ip';

export const IpAddress = createParamDecorator((data, req) => {
  if (req.clientIp) {
    return req.clientIp;
  }
  return requestIP.getClientIp(req);
});