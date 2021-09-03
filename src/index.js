"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAxiosFetch = void 0;
const node_fetch_1 = require("node-fetch");
const form_data_1 = __importDefault(require("form-data"));
/**
 * A Fetch WebAPI implementation based on the Axios client
 */
async function axiosFetch(axios, 
// Convert the `fetch` style arguments into a Axios style config
transformer, input, init = {}) {
    const rawHeaders = init.headers || {};
    const lowerCasedHeaders = Object.keys(rawHeaders)
        .reduce((acc, key) => {
        acc[key.toLowerCase()] = rawHeaders[key] || '';
        return acc;
    }, {});
    if (!('content-type' in lowerCasedHeaders)) {
        lowerCasedHeaders['content-type'] = 'text/plain;charset=UTF-8';
    }
    const rawConfig = {
        url: input,
        method: init.method || 'GET',
        data: typeof init.body === 'undefined' || init.body instanceof form_data_1.default ? init.body : String(init.body),
        headers: lowerCasedHeaders,
        // Force the response to an arraybuffer type. Without this, the Response
        // object will try to guess the content type and add headers that weren't in
        // the response.
        // NOTE: Don't use 'stream' because it's not supported in the browser
        responseType: 'arraybuffer'
    };
    const config = transformer ? transformer(rawConfig, input, init) : rawConfig;
    let result;
    try {
        result = await axios.request(config);
    }
    catch (err) {
        if (err.response) {
            result = err.response;
        }
        else {
            throw err;
        }
    }
    const fetchHeaders = new node_fetch_1.Headers(result.headers);
    return new node_fetch_1.Response(result.data, {
        status: result.status,
        statusText: result.statusText,
        headers: fetchHeaders
    });
}
function buildAxiosFetch(axios, transformer) {
    return axiosFetch.bind(undefined, axios, transformer);
}
exports.buildAxiosFetch = buildAxiosFetch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQ0FBK0Q7QUFDL0QsMERBQWlDO0FBY2pDOztHQUVHO0FBQ0gsS0FBSyxVQUFVLFVBQVUsQ0FDdkIsS0FBb0I7QUFDcEIsZ0VBQWdFO0FBQ2hFLFdBQThCLEVBQzlCLEtBQWMsRUFDZCxPQUFrQixFQUFFO0lBRXBCLE1BQU0sVUFBVSxHQUEyQixJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzlDLE1BQU0sQ0FDTCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9DLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO0lBRUosSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLGlCQUFpQixDQUFDLEVBQUU7UUFDMUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsMEJBQTBCLENBQUM7S0FDaEU7SUFFRCxNQUFNLFNBQVMsR0FBdUI7UUFDcEMsR0FBRyxFQUFFLEtBQUs7UUFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLO1FBQzVCLElBQUksRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLFlBQVksbUJBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkcsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQix3RUFBd0U7UUFDeEUsNEVBQTRFO1FBQzVFLGdCQUFnQjtRQUNoQixxRUFBcUU7UUFDckUsWUFBWSxFQUFFLGFBQWE7S0FDNUIsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUU3RSxJQUFJLE1BQU0sQ0FBQztJQUNYLElBQUk7UUFDRixNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RDO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7U0FDdkI7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFDO1NBQ1g7S0FDRjtJQUVELE1BQU0sWUFBWSxHQUFHLElBQUksb0JBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdEQsT0FBTyxJQUFJLHFCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtRQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07UUFDckIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO1FBQzdCLE9BQU8sRUFBRSxZQUFZO0tBQ3RCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixlQUFlLENBQUUsS0FBb0IsRUFBRSxXQUE4QjtJQUNuRixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsMENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZSwgSGVhZGVycyBhcyBGZXRjaEhlYWRlcnMgfSBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hJbml0IGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55PiB7XG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBtZXRob2Q/OiBBeGlvc1JlcXVlc3RDb25maWdbJ21ldGhvZCddO1xuICBib2R5PzogRm9ybURhdGEgfCBhbnk7XG4gIGV4dHJhPzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBBeGlvc1RyYW5zZm9ybWVyID0gKGNvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnLCBpbnB1dDogc3RyaW5nIHwgdW5kZWZpbmVkLCBpbml0OiBGZXRjaEluaXQpID0+IEF4aW9zUmVxdWVzdENvbmZpZztcblxuZXhwb3J0IHR5cGUgQXhpb3NGZXRjaCA9IChpbnB1dD86IHN0cmluZywgaW5pdD86IEZldGNoSW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT47XG5cbi8qKlxuICogQSBGZXRjaCBXZWJBUEkgaW1wbGVtZW50YXRpb24gYmFzZWQgb24gdGhlIEF4aW9zIGNsaWVudFxuICovXG5hc3luYyBmdW5jdGlvbiBheGlvc0ZldGNoIChcbiAgYXhpb3M6IEF4aW9zSW5zdGFuY2UsXG4gIC8vIENvbnZlcnQgdGhlIGBmZXRjaGAgc3R5bGUgYXJndW1lbnRzIGludG8gYSBBeGlvcyBzdHlsZSBjb25maWdcbiAgdHJhbnNmb3JtZXI/OiBBeGlvc1RyYW5zZm9ybWVyLFxuICBpbnB1dD86IHN0cmluZyxcbiAgaW5pdDogRmV0Y2hJbml0ID0ge31cbikge1xuICBjb25zdCByYXdIZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gaW5pdC5oZWFkZXJzIHx8IHt9O1xuICBjb25zdCBsb3dlckNhc2VkSGVhZGVycyA9IE9iamVjdC5rZXlzKHJhd0hlYWRlcnMpXG4gICAgLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PihcbiAgICAgIChhY2MsIGtleSkgPT4ge1xuICAgICAgICBhY2Nba2V5LnRvTG93ZXJDYXNlKCldID0gcmF3SGVhZGVyc1trZXldIHx8ICcnO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSxcbiAgICAgIHt9XG4gICAgKTtcblxuICBpZiAoISgnY29udGVudC10eXBlJyBpbiBsb3dlckNhc2VkSGVhZGVycykpIHtcbiAgICBsb3dlckNhc2VkSGVhZGVyc1snY29udGVudC10eXBlJ10gPSAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JztcbiAgfVxuXG4gIGNvbnN0IHJhd0NvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge1xuICAgIHVybDogaW5wdXQsXG4gICAgbWV0aG9kOiBpbml0Lm1ldGhvZCB8fCAnR0VUJyxcbiAgICBkYXRhOiB0eXBlb2YgaW5pdC5ib2R5ID09PSAndW5kZWZpbmVkJyB8fCBpbml0LmJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSA/IGluaXQuYm9keSA6IFN0cmluZyhpbml0LmJvZHkpLFxuICAgIGhlYWRlcnM6IGxvd2VyQ2FzZWRIZWFkZXJzLFxuICAgIC8vIEZvcmNlIHRoZSByZXNwb25zZSB0byBhbiBhcnJheWJ1ZmZlciB0eXBlLiBXaXRob3V0IHRoaXMsIHRoZSBSZXNwb25zZVxuICAgIC8vIG9iamVjdCB3aWxsIHRyeSB0byBndWVzcyB0aGUgY29udGVudCB0eXBlIGFuZCBhZGQgaGVhZGVycyB0aGF0IHdlcmVuJ3QgaW5cbiAgICAvLyB0aGUgcmVzcG9uc2UuXG4gICAgLy8gTk9URTogRG9uJ3QgdXNlICdzdHJlYW0nIGJlY2F1c2UgaXQncyBub3Qgc3VwcG9ydGVkIGluIHRoZSBicm93c2VyXG4gICAgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInXG4gIH07XG5cbiAgY29uc3QgY29uZmlnID0gdHJhbnNmb3JtZXIgPyB0cmFuc2Zvcm1lcihyYXdDb25maWcsIGlucHV0LCBpbml0KSA6IHJhd0NvbmZpZztcblxuICBsZXQgcmVzdWx0O1xuICB0cnkge1xuICAgIHJlc3VsdCA9IGF3YWl0IGF4aW9zLnJlcXVlc3QoY29uZmlnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgICAgcmVzdWx0ID0gZXJyLnJlc3BvbnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZmV0Y2hIZWFkZXJzID0gbmV3IEZldGNoSGVhZGVycyhyZXN1bHQuaGVhZGVycyk7XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShyZXN1bHQuZGF0YSwge1xuICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiByZXN1bHQuc3RhdHVzVGV4dCxcbiAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnNcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEF4aW9zRmV0Y2ggKGF4aW9zOiBBeGlvc0luc3RhbmNlLCB0cmFuc2Zvcm1lcj86IEF4aW9zVHJhbnNmb3JtZXIpOiBBeGlvc0ZldGNoIHtcbiAgcmV0dXJuIGF4aW9zRmV0Y2guYmluZCh1bmRlZmluZWQsIGF4aW9zLCB0cmFuc2Zvcm1lcik7XG59XG4iXX0=