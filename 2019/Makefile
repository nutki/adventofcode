EMCCOPTS = -s "EXPORTED_FUNCTIONS=['_run','_init','_clone','_output','_done','_peek']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['getValue','setValue','cwrap']" -s WASM=1 -s BINARYEN_ASYNC_COMPILATION=0 -s ALLOW_MEMORY_GROWTH=1 

intcode.em.js:

%.em.js: %.c
	emcc $(EMCCOPTS) -O2 $< -o $@
