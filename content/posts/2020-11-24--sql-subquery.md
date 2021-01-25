---
title: SQL 서브쿼리
date: '2020-11-24T20:50:37.121Z'
template: 'post'
draft: false
slug: '/sql/subquery'
category: 'sql'
tags:
  - 'sql'
description: ''
socialImage: '/media/image-2.jpg'
---

다음은 이 수업에서 사용되는 Parch & Posey 데이터베이스 스키마이다.

![parch_posey_schema](/media/parch_posey_schema.png)

## 서브쿼리 기초

- 서브쿼리는 반드시 괄호 안에 위치해야 한다.
- 서브쿼리는 반드시 독립적이어야 하고 서브쿼리 스스로 실행될 수 있어야 한다.
- 서브쿼리에는 두가지 고려할 구성요소가 있다.
  - 서브쿼리가 위치하는 곳
  - 바깥의 쿼리와의 의존성

### 서브쿼리가 독립적인 경우 주의사항

거의 모든 경우에 서브쿼리는 완전히 독립적이다. 이들은 독립적으로 완전히 실행할 수 있는 임시 테이블이다. 하지만 예외가 있다. 일반적으로 중첩되거나(Nested) 또는 인라인(Inline) 형식의 서브쿼리가 외부 쿼리와 상관 관계가 있는 경우 서브쿼리는 독립적으로 실행할 수 없다. 이와 같은 경우는 일반적인 서브쿼리와는 다르게 자주 구현되는 방식은 아니다.

### 서브쿼리가 위치하는 곳

서브쿼리가 외부쿼리 안에 위치하는 곳은 다음의 네가지 경우가 있다.

- With
- Nested
- Inline
- Scalar

### 추가 학습자료

**[Microsoft Subqueries](https://docs.microsoft.com/en-us/sql/relational-databases/performance/subqueries?view=sql-server-ver15)** 참고

## 서브쿼리 Placement

### With

이 서브쿼리는 기존의 테이블에서 가상의 테이블을 생성하고 이 가상 테이블을 외부 쿼리의 가장 위에 시각적으로 위치시키고 싶을때 사용한다.

### Inline

이 서브쿼리는 위의 With과 같은 경우에 사용된다. 가상 테이블이 외부 쿼리의 최상단에 위치하는 With 문의 경우와는 달리 이 서브쿼리는 FROM 문 안에 위치한다.

### Nested

이 서브쿼리는 외부 쿼리 안에서 필터링을 하는 역할을 할때 사용한다. 주로 WHERE 문 안에 사용된다.

### Scalar

이 서브쿼리는 일종의 벤치 마크로 사용할 스칼라 값을 생성하려는 경우에 사용된다. 예를들어 전체 조직의 평균 급여를 계산하여 개별 직원 급여와 비교하려는 경우가 있다. 이 서브쿼리는 생성되어 벤치 마크로 사용되는 단일 값인 경우가 많기 때문에 종종 SELECT 문 내에 위치한다.

다음의 이미지는 위의 각각의 경우에 해당하는 쿼리예시이다.
![sql placement](/media/sql_placement.jpg)

## Placement: With

- 가독성이 좋다.

예시
![sql placement with](/media/subquery_with.png)

## Placement: Nested

예시
![sql placement nested](/media/subquery_nested.png)

## Placement: Inline

- 가독성이 조금 떨어진다.

예시
![sql placement inline](/media/subquery_inline.png)

## Placement: Scalar

- 만약 Scalar 서브쿼리가 매치되는 값을 찾지 못하면 이는 NULL을 리턴한다.
- 만약 Scalar 서브쿼리가 여러 개의 매치되는 값을 찾는다면 이는 Error을 리턴한다.

예시
![sql placement scalar](/media/subquery_scalar.png)

## 디펜던시가 있는 서브쿼리

하지만 때로는 서브쿼리의 값이 외부 쿼리에서 얻어진 값에 따라 달라지는 경우 (ex : 필터구문이 지속적으로 변경됨) 상호 관련된 서브쿼리를 포함하는 것이 좋다. 아래 예에서 서브쿼리의 값인 평균 GPA는 학생이 다니는 대학에 따라 계속 변경된다는 것을 알 수 있다. 상호 관련된 서브쿼리에 대한 좋은 사용 사례이다.

```sql
SELECT first_name, last_name, GPA, university
 FROM student_db outer_db
 WHERE GPA >
                (SELECT AVG(GPA)
                 FROM student_db
                 WHERE university = outer_db.university);
```

### Simple vs Correlated

![subquery_corelated_independent](/media/subquery_corelated_independent.png)

## 서브쿼리 Practice

1. 어떤 채널에서 Parch & Posey에 평균적으로 하루에 가장 많은 트래픽을 보내는 지를 알아보자.

```sql
SELECT channel, AVG(event_count)
FROM
(SELECT DATE_TRUNC('day', occurred_at) AS day,
       channel,
       COUNT(*) as event_count
FROM web_events
GROUP BY 1, 2
) sub
GROUP BY 1
ORDER BY 2 DESC;
```

2. 첫번째 주문이 발생한 월과 같은 월에 발생한 주문들만을 쿼리해보자.

다음의 예시는 서브쿼리에서 한 개의 결과만을 리턴하기 때문에 동작한다.
만약 서브쿼리가 여러개의 결과값을 리턴한다면 조건 연산자 IN 을 사용해야 한다.

```sql
SELECT *
  FROM orders
  WHERE DATE_TRUNC('month', occurred_at) =
  (SELECT DATE_TRUNC('month', MIN(occurred_at)) AS min_month
    FROM orders)
  ORDER BY occurred_at
```

3. 위 2번의 결과를 바탕으로 각 paper 타입별 qty의 평균을 구해보자.

```SQL

SELECT
  AVG(standard_qty) standard_avg,
  AVG(gloss_qty) gloss_avg,
  AVG(poster_qty) poster_avg
FROM(
  SELECT *
  FROM orders
  WHERE DATE_TRUNC('month', occurred_at) =
    (SELECT MIN(DATE_TRUNC('month', occurred_at))
      FROM orders)
   ) sub
```

### expert tip

조건문에 서브쿼리를 작성할 때 alias을 포함하면 안된다. 이는 서브쿼리가 테이블이 아닌 개별 값 (또는 IN 경우 값 집합)으로 처리되기 때문이다. Nested 및 Scalar 서브쿼리는 종종 With 및 Inline 서브쿼리와 같은 방식으로 alias가 필요하지 않다.

4. 각 account 에서 가장 많이 사용한 채널을 구하여라.

```sql
SELECT T1.name, Max(T1.count)
FROM (
       SELECT accounts.name as name, web_events.channel as channel, Count(*) as count
       FROM accounts
       JOIN web_events ON accounts.id = Web_events.account_id
       GROUP BY 1, 2
       ORDER BY 1,3
) as T1
GROUP BY 1
```

결과

![subquery_practice_result](/media/subquery_practice_result.png)

<!-- ![subquery_corelated_independent](/media/subquery_corelated_independent.png) -->

5. Provide the name of the sales_rep in each region with the largest amount of total_amt_usd sales.

```sql
SELECT t3.region, t3.name, t3.total_usd
FROM (SELECT region, MAX(total_usd) total_usd
      FROM (SELECT r.name region, s.name, SUM(o.total_amt_usd) total_usd
            FROM sales_reps s
            LEFT JOIN accounts a ON a.sales_rep_id = s.id
            LEFT JOIN orders o ON a.id = o.account_id
            INNER JOIN region r ON r.id = s.region_id
            GROUP BY 1, 2) t1 GROUP BY 1
      ) t2
JOIN (SELECT r.name region, s.name,
      SUM(o.total_amt_usd) total_usd
      FROM sales_reps s
      LEFT JOIN accounts a ON a.sales_rep_id = s.id
      LEFT JOIN orders o ON a.id = o.account_id
      INNER JOIN region r ON r.id = s.region_id
      GROUP BY 1, 2) t3
      ON t2.region = t3.region AND t2.total_usd = t3.total_usd
```

6. For the region with the largest (sum) of sales total_amt_usd, how many total (count) orders were placed?

```sql
SELECT t1.name, t2.num_orders
FROM (SELECT R.name, SUM(O.total_amt_usd) total_usd
      FROM orders O
      INNER JOIN accounts A ON A.id = O.account_id
      INNER JOIN sales_reps S ON s.id = A.sales_rep_id
      INNER JOIN region R ON R.id = S.region_id
      GROUP BY 1
      ORDER BY 2 DESC LIMIT 1) t1
JOIN  (SELECT R.name, COUNT(O.*) num_orders
      FROM orders O
      INNER JOIN accounts A ON A.id = O.account_id
      INNER JOIN sales_reps S ON s.id = A.sales_rep_id
      INNER JOIN region R ON R.id = S.region_id
      GROUP BY 1) t2
ON t2.name = t1.name
```

7. How many accounts had more total purchases than the account name which has bought the most standard_qty paper throughout their lifetime as a customer?

```sql
SELECT COUNT(*)
FROM (SELECT A.id, SUM(O.total) total
      FROM accounts A
      INNER JOIN orders O ON O.account_id = A.id
      GROUP BY 1
      HAVING SUM(O.total) > (SELECT total
                              FROM( SELECT A.name, SUM(O.standard_qty), SUM(O.total) total
                                    FROM accounts A
                                    INNER JOIN orders O ON O.account_id = A.id
                                    GROUP BY 1
                                    ORDER BY 2 DESC
                                    LIMIT 1
                                    ) t1
                                  )
                                ) t2
```

8. For the customer that spent the most (in total over their lifetime as a customer) total_amt_usd, how many web_events did they have for each channel?

```sql


SELECT A.id, W.channel, COUNT(W.*) web_events
FROM accounts A
INNER JOIN web_events W ON W.account_id = A.id
GROUP BY 1, 2
HAVING A.id = ( SELECT t1.id
              FROM (SELECT A.id, SUM(O.total_amt_usd) total_usd
                    FROM accounts A
                    INNER JOIN orders O ON O.account_id = A.id
                    GROUP BY 1
                    ORDER BY 2 DESC
                    LIMIT 1) t1
)
ORDER BY 3 DESC
```

9. What is the lifetime average amount spent in terms of total_amt_usd for the top 10 total spending accounts?

```sql

SELECT AVG(t1.total_usd)
FROM (SELECT A.id, A.name, SUM(O.total_amt_usd) total_usd
      FROM accounts A
      INNER JOIN orders O ON O.account_id = A.id
      GROUP BY 1, 2
      ORDER BY 3 DESC
      LIMIT 10) t1
```

10. What is the lifetime average amount spent in terms of total_amt_usd, including only the companies that spent more per order, on average, than the average of all orders.

```sql
SELECT AVG(t1.avg_per_order)
FROM (SELECT A.id, A.name, AVG(O.total_amt_usd) avg_per_order
      FROM accounts A
      INNER JOIN orders O ON O.account_id = A.id
      GROUP BY 1, 2
      HAVING AVG(O.total_amt_usd) > (SELECT AVG(total_amt_usd)
                                      FROM orders)) t1
```

## WITH 서브쿼리 practice

다음은 위에서의 연습문제 1번이다.

어떤 채널에서 Parch & Posey에 평균적으로 하루에 가장 많은 트래픽을 보내는 지를 알아보자.

```sql
SELECT channel, AVG(event_count)
FROM
(SELECT DATE_TRUNC('day', occurred_at) AS day,
       channel,
       COUNT(*) as event_count
FROM web_events
GROUP BY 1, 2
) sub
GROUP BY 1
ORDER BY 2 DESC;
```

이 문제를 WITH 사용하여 풀면 다음과 같이 나타낼 수 있다.

```sql
WITH events AS (
          SELECT DATE_TRUNC('day',occurred_at) AS day,
                        channel, COUNT(*) as events
          FROM web_events
          GROUP BY 1,2)

SELECT channel, AVG(events) AS average_events
FROM events
GROUP BY channel
ORDER BY 2 DESC;
```

만약 추가로 더 필요한 테이블이 있다면 다음과 같이 여러개를 생성하여 사용할 수 있다.

```sql
WITH table1 AS (
          SELECT *
          FROM web_events),

     table2 AS (
          SELECT *
          FROM accounts)

SELECT *
FROM table1
JOIN table2
ON table1.account_id = table2.id;
```

[sql 쿼리 퍼포먼스 최적화](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)에 대한 추가 학습자료

## SQL VIEWS
