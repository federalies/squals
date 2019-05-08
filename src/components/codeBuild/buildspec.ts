export interface IbuildSpecPhases_Step {
  commands: string[]
  finally?: string[]
  'run-as'?: string
  'runtime-versions'?: { [lang: string]: number }
}
export type IbuildSpecPhases =
  | IbuildSpecPhases_Step_Install
  | IbuildSpecPhases_Step_PreBuild
  | IbuildSpecPhases_Step_Build
  | IbuildSpecPhases_Step_PostBuild

export interface IbuildSpecPhases_Step_Install {
  install: IbuildSpecPhases_Step
}
export interface IbuildSpecPhases_Step_PreBuild {
  pre_build: IbuildSpecPhases_Step
}
export interface IbuildSpecPhases_Step_Build {
  build: IbuildSpecPhases_Step
}
export interface IbuildSpecPhases_Step_PostBuild {
  post_build: IbuildSpecPhases_Step
}

export interface IbuildSpecArtifactData {
  files: string[]
  'discard-paths': boolean
}

export interface IbuildSpecArtifactSecondaryMap {
  [artifactId: string]: IbuildSpecArtifactData
}

type stringish = string | string[]

export class BuildSpec {
  version = 0.2
  phases?: IbuildSpecPhases
  cache?: {
    paths: string[]
  }
  env?: {
    variables: { [prefix: string]: string }
    'parameter-store': { [prefix: string]: string }
  }
  artifacts?: {
    files: string[]
    'discard-paths': boolean
    'secondary-artifacts': IbuildSpecArtifactSecondaryMap
  }
  constructor () {}
  Install (commands: stringish, andfinally: stringish): BuildSpec {
    return this
  }
  PreBuild (commands: stringish, andfinally: stringish): BuildSpec {
    return this
  }
  Build (commands: stringish, andfinally: stringish): BuildSpec {
    return this
  }
  PostBuild (commands: stringish, andfinally: stringish): BuildSpec {
    return this
  }
  Artifacts (input: [string[], boolean?][]): BuildSpec {
    return this
  }
  Env (): BuildSpec {
    return this
  }
  Cache (): BuildSpec {
    return this
  }
}

/*

version: 0.2

env:
  variables:
    JAVA_HOME: "/usr/lib/jvm/java-8-openjdk-amd64"
  parameter-store:
    LOGIN_PASSWORD: /CodeBuild/dockerLoginPassword

phases:
  install:
    runtime-versions:
      - nodejs: 10
    commands:
      - echo Entered the install phase...
      - apt-get update -y
      - apt-get install -y maven
    finally:
      - echo This always runs even if the update or install command fails
  pre_build:
    commands:
      - echo Entered the pre_build phase...
      - docker login –u User –p $LOGIN_PASSWORD
    finally:
      - echo This always runs even if the login command fails
  build:
    commands:
      - echo Entered the build phase...
      - echo Build started on `date`
      - mvn install
    finally:
      - echo This always runs even if the install command fails
  post_build:
    commands:
      - echo Entered the post_build phase...
      - echo Build completed on `date`

artifacts:
  files:
    - target/messageUtil-1.0.jar
  discard-paths: yes
  secondary-artifacts:
    artifact1:
      files:
        - target/messageUtil-1.0.jar
      discard-paths: yes
    artifact2:
      files:
        - target/messageUtil-1.0.jar
      discard-paths: yes

cache:
  paths:
    - '/root/.m2/* * / *'
    - '/root/.m3/* * / *'

*/
