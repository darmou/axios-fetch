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
    const lowerCasedHeaders = Object.keys(rawHeaders).filter(key => key && rawHeaders[key])
        .reduce((acc, key) => {
        acc[key.toLowerCase()] = rawHeaders[key];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQ0FBK0Q7QUFDL0QsMERBQWlDO0FBY2pDOztHQUVHO0FBQ0gsS0FBSyxVQUFVLFVBQVUsQ0FDdkIsS0FBb0I7QUFDcEIsZ0VBQWdFO0FBQ2hFLFdBQThCLEVBQzlCLEtBQWMsRUFDZCxPQUFrQixFQUFFO0lBRXBCLE1BQU0sVUFBVSxHQUEyQixJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwRixNQUFNLENBQ0wsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDWCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUNELEVBQUUsQ0FDSCxDQUFDO0lBRUosSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLGlCQUFpQixDQUFDLEVBQUU7UUFDMUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsMEJBQTBCLENBQUM7S0FDaEU7SUFFRCxNQUFNLFNBQVMsR0FBdUI7UUFDcEMsR0FBRyxFQUFFLEtBQUs7UUFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLO1FBQzVCLElBQUksRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLFlBQVksbUJBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkcsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQix3RUFBd0U7UUFDeEUsNEVBQTRFO1FBQzVFLGdCQUFnQjtRQUNoQixxRUFBcUU7UUFDckUsWUFBWSxFQUFFLGFBQWE7S0FDNUIsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUU3RSxJQUFJLE1BQU0sQ0FBQztJQUNYLElBQUk7UUFDRixNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RDO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7U0FDdkI7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFDO1NBQ1g7S0FDRjtJQUVELE1BQU0sWUFBWSxHQUFHLElBQUksb0JBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdEQsT0FBTyxJQUFJLHFCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtRQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07UUFDckIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO1FBQzdCLE9BQU8sRUFBRSxZQUFZO0tBQ3RCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixlQUFlLENBQUUsS0FBb0IsRUFBRSxXQUE4QjtJQUNuRixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsMENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZSwgSGVhZGVycyBhcyBGZXRjaEhlYWRlcnMgfSBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hJbml0IGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55PiB7XG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBtZXRob2Q/OiBBeGlvc1JlcXVlc3RDb25maWdbJ21ldGhvZCddO1xuICBib2R5PzogRm9ybURhdGEgfCBhbnk7XG4gIGV4dHJhPzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBBeGlvc1RyYW5zZm9ybWVyID0gKGNvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnLCBpbnB1dDogc3RyaW5nIHwgdW5kZWZpbmVkLCBpbml0OiBGZXRjaEluaXQpID0+IEF4aW9zUmVxdWVzdENvbmZpZztcblxuZXhwb3J0IHR5cGUgQXhpb3NGZXRjaCA9IChpbnB1dD86IHN0cmluZywgaW5pdD86IEZldGNoSW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT47XG5cbi8qKlxuICogQSBGZXRjaCBXZWJBUEkgaW1wbGVtZW50YXRpb24gYmFzZWQgb24gdGhlIEF4aW9zIGNsaWVudFxuICovXG5hc3luYyBmdW5jdGlvbiBheGlvc0ZldGNoIChcbiAgYXhpb3M6IEF4aW9zSW5zdGFuY2UsXG4gIC8vIENvbnZlcnQgdGhlIGBmZXRjaGAgc3R5bGUgYXJndW1lbnRzIGludG8gYSBBeGlvcyBzdHlsZSBjb25maWdcbiAgdHJhbnNmb3JtZXI/OiBBeGlvc1RyYW5zZm9ybWVyLFxuICBpbnB1dD86IHN0cmluZyxcbiAgaW5pdDogRmV0Y2hJbml0ID0ge31cbikge1xuICBjb25zdCByYXdIZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gaW5pdC5oZWFkZXJzIHx8IHt9O1xuICBjb25zdCBsb3dlckNhc2VkSGVhZGVycyA9IE9iamVjdC5rZXlzKHJhd0hlYWRlcnMpLmZpbHRlcihrZXkgPT4ga2V5ICYmIHJhd0hlYWRlcnNba2V5XSlcbiAgICAucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KFxuICAgICAgKGFjYywga2V5KSA9PiB7XG4gICAgICAgIGFjY1trZXkudG9Mb3dlckNhc2UoKV0gPSByYXdIZWFkZXJzW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LFxuICAgICAge31cbiAgICApO1xuXG4gIGlmICghKCdjb250ZW50LXR5cGUnIGluIGxvd2VyQ2FzZWRIZWFkZXJzKSkge1xuICAgIGxvd2VyQ2FzZWRIZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xuICB9XG5cbiAgY29uc3QgcmF3Q29uZmlnOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7XG4gICAgdXJsOiBpbnB1dCxcbiAgICBtZXRob2Q6IGluaXQubWV0aG9kIHx8ICdHRVQnLFxuICAgIGRhdGE6IHR5cGVvZiBpbml0LmJvZHkgPT09ICd1bmRlZmluZWQnIHx8IGluaXQuYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhID8gaW5pdC5ib2R5IDogU3RyaW5nKGluaXQuYm9keSksXG4gICAgaGVhZGVyczogbG93ZXJDYXNlZEhlYWRlcnMsXG4gICAgLy8gRm9yY2UgdGhlIHJlc3BvbnNlIHRvIGFuIGFycmF5YnVmZmVyIHR5cGUuIFdpdGhvdXQgdGhpcywgdGhlIFJlc3BvbnNlXG4gICAgLy8gb2JqZWN0IHdpbGwgdHJ5IHRvIGd1ZXNzIHRoZSBjb250ZW50IHR5cGUgYW5kIGFkZCBoZWFkZXJzIHRoYXQgd2VyZW4ndCBpblxuICAgIC8vIHRoZSByZXNwb25zZS5cbiAgICAvLyBOT1RFOiBEb24ndCB1c2UgJ3N0cmVhbScgYmVjYXVzZSBpdCdzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGJyb3dzZXJcbiAgICByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcidcbiAgfTtcblxuICBjb25zdCBjb25maWcgPSB0cmFuc2Zvcm1lciA/IHRyYW5zZm9ybWVyKHJhd0NvbmZpZywgaW5wdXQsIGluaXQpIDogcmF3Q29uZmlnO1xuXG4gIGxldCByZXN1bHQ7XG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gYXdhaXQgYXhpb3MucmVxdWVzdChjb25maWcpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLnJlc3BvbnNlKSB7XG4gICAgICByZXN1bHQgPSBlcnIucmVzcG9uc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmZXRjaEhlYWRlcnMgPSBuZXcgRmV0Y2hIZWFkZXJzKHJlc3VsdC5oZWFkZXJzKTtcblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKHJlc3VsdC5kYXRhLCB7XG4gICAgc3RhdHVzOiByZXN1bHQuc3RhdHVzLFxuICAgIHN0YXR1c1RleHQ6IHJlc3VsdC5zdGF0dXNUZXh0LFxuICAgIGhlYWRlcnM6IGZldGNoSGVhZGVyc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQXhpb3NGZXRjaCAoYXhpb3M6IEF4aW9zSW5zdGFuY2UsIHRyYW5zZm9ybWVyPzogQXhpb3NUcmFuc2Zvcm1lcik6IEF4aW9zRmV0Y2gge1xuICByZXR1cm4gYXhpb3NGZXRjaC5iaW5kKHVuZGVmaW5lZCwgYXhpb3MsIHRyYW5zZm9ybWVyKTtcbn1cbiJdfQ==