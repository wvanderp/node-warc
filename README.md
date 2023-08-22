# node-warc

## Toughs

This library was started as a way to write Warc files from nodejs. It started with the idea that you would just pass it a fetch or axios result, and it would create the warm document for you.

But then I discovered that the result object did not have all the required information. This put the project on hold for a while.

Then when I came back to the project somehow decided to focus on the paring of the Warc files. At first, both God and I knew why. But now, only God knows.

In this third iteration, I'm returning to Warc writing with a new approach. I will start with the manual creation of the war record. All data will be passed by the programmer. Then plugins can be written to intergrade fetch and Axios.

The parsing and writing of warc files steam to work, so I will leave it for now.
