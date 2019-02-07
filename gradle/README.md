# Gradle version 5.1.1 참고 문서

## 개요
그래들은 Groovy와 Kotlin DSL을 이용한 소스 빌드 자동화 도구입니다.
버전 5부터 Kotlin DSL을 지원함으로 관련해서 스터디겸 Kotlin DSL로 gradle 구성해보는 과정을 기록하려합니다.
이 글은 지극히 개발에 대한 지식만을 다루며 서버 개발의 관점임을 알려드립니다.

## Project와 Task
스크립트의 기본이 되는 요소는 project입니다. project들은 각각 task를 갖고 task는 어떠한 작업을 나타내는 가장 기본적인 단위입니다.
task의 기본적인 예로는 jar를 생성하거나 sourceDoc을 생성하거나 저장소에 소스를 저장하는 작업들 입니다.

```kotlin
tasks.register("hello") {
    doLast {
        val hello = "hello"
        println(hello)
    }
}
```

## Task 

### 의존성

```kotlin
tasks.register("hi") {
    doLast {
        println("hi")
    }
}

tasks.register("intro") {
    dependsOn("five")
    doLast {
        println("it's done")
    }
}

```

위의 테스크를 `gradle intro`로 실행하면 hi라는 테스크를 의존하는 intro테스크이기 때문에 hi 테스크가 먼저 실행된다.

### 동적 생성

```kotlin
repeat(4) { counter -> 
    tasks.register("task$counter") {
        doLast {
            println("$counter")
        }
    }
}
```

테스크는 스크립트 상에서 정적인 선언을 통해서만 아니라 스크립트의 결과로 생성할 수 있습니다.
ant 빌드 도구와의 특별한 차이점임을 gradle 제단에서는 강조합니다.

### 이미 존재하는 테스크 조작

```kotlin
task.register("hello") {
    println("hello")
}

task.register("world") {
    println("world")
}

task.named("world") {
    dependsOn("hello")
}
```

`task.named` api를 통해 이미 존재하는 테스크에 의존성을 추가할 수 있습니다.

```kotlin
val hello by tasks.registering {
    doLast {
        println("Hello Earth")
    }
}
hello {
    doFirst {
        println("Hello Venus")
    }
}
hello {
    doLast {
        println("Hello Mars")
    }
}
hello {
    doLast {
        println("Hello Jupiter")
    }
}
```

처음 변수 선언 부분은 다른 형태의 테스크 선언문입니다. 위의 예에서 볼수 있는 테스크 선언과 같습니다.
이후 테스크에 doFirst, doLast 요소들을 추가합니다. 같은 요소를 추가했더라도 오버라이딩이 되지않으며 선언한 순서대로
테스크가 실행됩니다. 이는 기존 테스크에 추가작업을 선언 하기위한 기능입니다.

### 다수의 테스크 선언

kotlin DSL에서만 허용되는 문법입니다.

```kotlin
tasks {
    test {
        testLogging.showStackTraces = true
    }
    val myCheck by registering {
        doLast { /* assert on something meaningful */ }
    }
    check {
        dependsOn(myCheck)
    }
    register("myHelp") {
        doLast { /* do something helpful */ }
    }
}
```

## Property
gradle은 project와 extra에 미리 선언된 프로퍼티를 사용하거나 새로 선언해서 사용합니다.

```kotlin
val projectProperty: String by project
val newProperty: String by extra("kotlinVersion")
```

첫줄은 project가 갖고있는 프로퍼티들을 변수에 바인딩합니다.
두번째 줄은 extra에 새로운 kotlinVersion이라는 프로퍼티를 생성하게 됩니다.

### Extra propterty
extra task는 task별로 혹은 프로젝트 별로 할당됩니다.
extra 프로퍼티로 새로운 변수를 선언하고 값을 초기화하여 사용합니다.

```kotlin
tasks.register("myTask") {
    extra["myProperty"] = "myValue"
}

tasks.register("printTaskProperties") {
    doLast {
        println(tasks["myTasks"].extra["myProperty"])
    }
}
```
