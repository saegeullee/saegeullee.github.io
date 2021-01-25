---
title: SQL Window Functions
date: '2020-11-28T20:50:37.121Z'
template: 'post'
draft: false
slug: '/sql/window-function'
category: 'sql'
tags:
  - 'sql'
description: ''
socialImage: '/media/image-2.jpg'
---

## 윈도우 함수란

윈도우 함수는 현재 행과 관련이 있는 테이블의 행 집합에 대한 계산이다. 이것은 일반적으로 현재 행을 통합하는 누계 계산(running totals) 또는
현재 행을 포함하여 행에서 레코드 순위 지정을 하는 것을 의미한다.

윈도우 함수는 group by 절과 결합된 집계 함수와 비슷하지만 한 가지 중요한 차이점이 있다. 윈도우 함수는 입력 테이블과 출력 테이블 (또는 결과) 사이의 총 행 수를 유지한다. 배후에서 window 함수는 쿼리 결과의 현재 행 이상에 액세스 할 수 있습니다.

## 윈도우 함수 용어

- Partition by: A subclause of the OVER clause. Similar to GROUP BY.
- Over: Typically precedes the partition by that signals what to “GROUP BY”.
- Aggregates: Aggregate functions that are used in window functions, too (e.g., sum, count, avg).
- Row_number(): Ranking function where each row gets a different number.
- Rank(): Ranking function where a row could get the same rank if they have the same value.
- Dense_rank(): Ranking function similar to rank() but ranks are not skipped with ties.
- Aliases: Shorthand that can be used if there are several window functions in one query.
- Percentiles: Defines what percentile a value falls into over the entire table.
- Lag/Lead: Calculating differences between rows’ values.

## Core 윈도우 함수

### Core 윈도우 함수 예시

![core_window_function](/media/core_window_function.png)

### Core 윈도우 함수 Syntax

```sql
AGGREGATE_FUNCTION (column_1) OVER
 (PARTITION BY column_2 ORDER BY column_3)
  AS new_column_name;
```

윈도우 함수를 사용하면 조인을 수행하지 않고도 한 행을 다른 행과 비교할 수 있다. 윈도우 함수는 시간에 따른 추이를 측정하거나 특정 열의 순위를 지정하려는 경우에 효과적이며 원본 데이터 집합을 축소하거나 압축하지 않고 총 행의 수를 유지한다.

### Quiz

![parch_posey_schema](/media/parch_posey_schema.png)

1. Create a running total of `standard_amt_usd` (in the orders table) over order time with no date truncation.

```sql
SELECT
  standard_amt_usd,
  SUM(standard_amt_usd) OVER
  (ORDER BY occurred_at) AS running_total
FROM orders
```

2. Now, modify your query from the previous quiz to include partitions. Still create a running total of `standard_amt_usd` (in the orders table) over order time, but this time, date truncate `occurred_at` by year and partition by that same year-truncated `occurred_at` variable. Your final table should have three columns: One with the amount being added for each row, one for the truncated date, and a final column with the running total within each year.

```sql
SELECT standard_amt_usd,
       DATE_TRUNC('year', occurred_at) as year,
       SUM(standard_amt_usd) OVER (PARTITION BY DATE_TRUNC('year', occurred_at) ORDER BY occurred_at) AS running_total
FROM orders
```

result
![window_function_parition_by1](/media/window_function_parition_by1.png)
...
![window_function_parition_by2](/media/window_function_parition_by2.png)

### Partition By and Aggregate Functions

![partition_by_and_aggregate_functions](/media/partition_by_and_aggregate_functions.png)

## Ranking 윈도우 함수

### Quiz

1. Select the `id`, `account_id`, and total variable from the orders table, then create a column called `total_rank` that ranks this total amount of paper ordered (from highest to lowest) for each account using a partition. Your final table should have these four columns.

```sql
SELECT id, account_id, total,
RANK() OVER (PARTITION BY account_id ORDER BY total DESC) total_rank
FROM orders
```

result

![ranking_window_func](/media/ranking_window_func.png)
