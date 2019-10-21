// import { flow } from 'lodash-es'

const flow = <T1, T2>(...functions: lazyTransforms<T1, T2>[]) =>
  functions.reduceRight((a, c) => (...args: any[]) => newFunction(a, c, args))

const allIndexLocs = <T, U>(_f: IannotatedLazyTransforms<T, U>[]) => {
  const ret = { reducer: [] as number[], filter: [] as number[] }
  return _f.reduce((p, c, i) => {
    if (c.type === 'reducer') {
      p.reducer.push(i)
    }
    if (c.type === 'filter') {
      p.reducer.push(i)
    }
    return p
  }, ret)
}

const mergeMappers = <T, U>(_f: IannotatedLazyTransforms<T, U>[], start = 0) => {
  const mergedChunks = [] as lazyTransforms<T1, T2>[]

  while (start < _f.length) {
    const currMergableMapperChunk = [] as lazyTransforms<T1, T2>[]
    while (_f[start].type === 'mapper') {
      currMergableMapperChunk.push(_f[start].fn)
      start++
    }
    currMergableMapperChunk.length > 0
      ? mergedChunks.push(flow(...currMergableMapperChunk))
      : mergedChunks.push(_f[start].fn)
    start++
  }
  return mergedChunks
}

export const lazy = <T, U>(composedTransitions?: IstepComposition<T, U>): lazyStep<T, U> => {
  const _seqfFns: lazyTransforms<T, U>[] = []
  const _composedSteps = composedTransitions
    ? composedTransitions
    : { mapper: [], flatmapper: [], reducer: [], filter: [], sorter: [] }
  return {
    _composedSteps,
    // a change in function types creates a new dataStateCheckPoint
    map: (...f: IFnMapper<T, U>[]) => {
      return lazy({ ..._composedSteps, mapper: _composedSteps.mapper.concat(f) })
    },
    flatMap: (...f: IFnMapper<T, U>[]) => {
      return lazy({ ..._composedSteps, flatmapper: _composedSteps.flatmapper.concat(f) })
    },
    filter: (...f: IFnFilter<T>[]) => {
      return lazy({ ..._composedSteps, filter: _composedSteps.filter.concat(f) })
    },
    reduce: (...f: IFnReducer<T, U>[]) => {
      return lazy({ ..._composedSteps, reducer: _composedSteps.reducer.concat(f) })
    },
    sort: (fn: IFnSorter<T>) => {
      return lazy({ ..._composedSteps, sorter: _composedSteps.sorter.concat(fn) })
    },
    // concat: (...d: IannotatedLazyTransforms[]) => {
    //   const n = [..._composedSteps, ...d]
    //   return lazy(...n)
    // },
    // // ejectors
    eval: (dataIn: T[]) => {
      // use a forced ordering???
      // mappers
      // filter
      // reduce | sort
      // sort

      /**
       * sorts are be omitted till the end
       * merge mappers until you find a filter, or reduce
       *
       * filters = are just a reduce with return:  [...prior] or [...prior, c], init:[]
       * orgaize function calls to look like:
       * [ {mapper: _fn(fn)},
       *   {filter:fn},
       *   {mapper: _fn(fn)},
       *   {reducer:fn},
       *   {filter: _fn(fn)},
       *   {mapper: _fn(fn)}
       *   {reducer:fn},
       *   {sort: fn}
       * ]
       */

      /**
       *
       * can [filter, reduce] be written as a single loop?
       * or maybe can [reduce, filter]???
       */

      const allIndexLocs = (_f: IannotatedLazyTransforms<T, U>[]) => {
        const ret = { reducer: [] as number[], filter: [] as number[] }
        return _f.reduce((p, c, i) => {
          if (c.type === 'reducer') {
            p.reducer.push(i)
          }
          if (c.type === 'filter') {
            p.reducer.push(i)
          }
          return p
        }, ret)
      }

      console.log({ _composedSteps })
      const mode = 'filter' as 'filter' | 'reducer' | 'none'

      const flow = <T1, T2>(...functions: lazyTransforms<T1, T2>[]) =>
        functions.reduceRight((a, c) => (...args: any[]) => newFunction(a, c, args))

      const mergeConsecMappers = <T1, T2>(_f: IannotatedLazyTransforms<T, U>[], start = 0) => {
        const mergedChunks = [] as lazyTransforms<T1, T2>[]

        while (start < _f.length) {
          const currMergableMapperChunk = [] as lazyTransforms<T1, T2>[]
          while (_f[start].type === 'mapper') {
            currMergableMapperChunk.push(_f[start].fn)
            start++
          }
          currMergableMapperChunk.length > 0
            ? mergedChunks.push(flow(...currMergableMapperChunk))
            : mergedChunks.push(_f[start].fn)
          start++
        }
        return mergedChunks
      }

      const minOrderedFns = mergeConsecMappers(_seqfFns)

      const mergedMapper = flow(_composedSteps.mapper) // change so that its merged up to the point of

      dataIn.map(v => mergedMapper(v))

      // mode == filter
      dataIn.reduce((p, c, i, a) => {
        return filterFunc(c, mergedMapper(i), a) ? [...p, c] : [...p]
      }, [])

      // mode == reducer
      dataIn.reduce((p, c, i, a) => {
        return reducerFunc[0](p, c, mergedMapper(i), a)
      }, reducerFunc[1])

      return mergedMapper(dataIn)
    },
    // _partial: (dataIn: T[]) => {
    //   return { lazy: lazy<T, U>(), out: 42 }
    // },
    inspect: () => ({
      _composedSteps
    })
  }
}

const r = lazy()
  .map(
    ((elem: number) => elem + 3) as any,
    ((elem: number) => elem + 2) as any,
    ((elem: number) => elem * 2) as any,
    ((elem: number) => elem + 4) as any,
    ((elem: number) => elem * 3) as any,
    ((elem: number) => elem / 6) as any
  )
  .reduce(...(([(p: number, c: number) => p + c, 0] as unknown) as IFnReducer<number, number>[]))
  .eval([1, 2, 3, 4, 5])

// console.log({ r: r.inspect() })
console.log({ r })

// #region interfaces

interface IstepComposition<T1, T2> {
  mapper: IFnMapper<T1, T2>[]
  flatmapper: IFnMapper<T1, T2>[]
  reducer: IFnReducer<T1, T2>[]
  filter: IFnFilter<T1>[]
  sorter: IFnSorter<T1>[]
}
type modeTypes = 'filter' | 'reducer' | 'none'

interface lazyStep<T1, T2> {
  _composedSteps: IstepComposition<T1, T2>
  map: (...f: IFnMapper<T1, T2>[]) => lazyStep<T1, T2>
  flatMap: (...f: IFnMapper<T1, T2>[]) => lazyStep<T1, T2>
  filter: (...f: IFnFilter<T1>[]) => lazyStep<T1, T2>
  reduce: (...f: IFnReducer<T1, T2>[]) => lazyStep<T1, T2>
  sort: (f: IFnSorter<T1>) => lazyStep<T1, T2>
  //   concat: (...d: lazyTransformFns[]) => lazyStep<T, T>
  /* ejectors */
  eval: (dataIn: T1[]) => T2
  //   _partial: (dataIn: T1[]) => { lazy: lazyStep<T1, T2>; out: T2 }
  inspect: () => { _composedSteps: IstepComposition<T1, T2> }
}

type IannotatedLazyTransforms<T1, T2> =
  | mapperF<T1, T2>
  | sorterF<T1>
  | filterF<T1>
  | reducerF<T1, T2>
  | flatMapperF<T1, T2>

type lazyTransforms<T1, T2> = IFnMapper<T1, T2> | IFnReducer<T1, T2> | IFnFilter<T1> | IFnSorter<T1>

type IFnMapper<T, U> = <T, U>(elem: T, idx?: number, arr?: T[]) => U
type IFnReducer<T, U> = <T, U>(fn: (acc: U, elem: T, idx?: number, arr?: T[]) => U, init: U) => U
type IFnFilter<T> = <T>(elem: T, idx?: number, arr?: T[]) => T
type IFnSorter<T> = <T>(elemA: T, elemB: T) => number

interface flatMapperF<T1, T2> {
  type: 'flatmapper'
  fn: IFnMapper<T1, T2>
}
interface mapperF<T1, T2> {
  type: 'mapper'
  fn: IFnMapper<T1, T2>
}
interface sorterF<T1> {
  type: 'sorter'
  fn: IFnSorter<T1>
}
interface filterF<T1> {
  type: 'filter'
  fn: IFnFilter<T1>
}
interface reducerF<T1, T2> {
  type: 'reducer'
  fn: IFnReducer<T1, T2>
}

function newFunction<T1, T2>(a: lazyTransforms<T1, T2>, c: lazyTransforms<T1, T2>, args: any[]) {
  return a(c(...args)) as T2
}
// #endregion interfaces
