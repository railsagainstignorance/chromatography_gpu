# Chromatography (using GPU)

[Live link](https://railsagainstignorance.github.io/chromatography_gpu/)

_Very much under construction, and rather broken just now_

Bringing together https://github.com/railsagainstignorance/chromatography and gpu.js (via http://gpu.rocks)

with the intention of having fast, hi-res, sort-of-realistic, wet-ink-in-blotting-paper physics in one's browser.

Is too slow, as is, to show the blotting as it happens, so there are high hopes that the GPU will give it a speed boost.

Gotchas:

* GPU hates if statements
* GPU is hard and complicated
* gpu.js is very early stage

## Plan 1

* get started with gpu.js
* build basic cellular automata

### problems

* golGpuUpdate = gpu.createKernel(...) is not working
   * should flip cell states
* nor is golGpuRender = gpu.createKernel
   * should display cell states

## Notes

* [gpu.js repo](https://github.com/gpujs/gpu.js)
