# Sorting Algorithm Performance Comparison

### Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It continues until the list is sorted.

### Quicksort

Quicksort is a divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.

### Mergesort

Mergesort is a divide-and-conquer algorithm that divides the unsorted list into smaller sub-lists, sorts those sub-lists, and then merges them to produce a sorted list.


## Performance

### Random Array

Results for Sorting Algorithm Performance Analysis on [Random Array]
-----------------------------------------------------------------------------------------------------------
Array Length | QuickSortPF Time | QuickSortPL Time | QuickSortRP Time | BubbleSort Time | MergeSort Time
-----------------------------------------------------------------------------------------------------------
           2 |         0.003 ms |         0.001 ms |         0.003 ms |        0.055 ms |       0.005 ms
           5 |         0.003 ms |         0.002 ms |         0.003 ms |        0.002 ms |       0.003 ms
          10 |         0.003 ms |         0.002 ms |         0.004 ms |        0.003 ms |       0.004 ms
          20 |         0.004 ms |         0.004 ms |         0.007 ms |        0.010 ms |       0.008 ms
          50 |         0.010 ms |         0.010 ms |         0.019 ms |        0.062 ms |       0.021 ms
         200 |         0.056 ms |         0.054 ms |         0.087 ms |        1.227 ms |       0.106 ms
         500 |         0.177 ms |         0.167 ms |         0.249 ms |        0.999 ms |       0.293 ms
        2500 |         1.050 ms |         0.890 ms |         1.291 ms |        6.988 ms |       1.412 ms
        9000 |         0.519 ms |         0.525 ms |         1.982 ms |       88.721 ms |       2.457 ms
       20000 |         1.287 ms |         1.299 ms |         5.916 ms |      645.537 ms |       4.904 ms
       40000 |         2.627 ms |         2.737 ms |         9.371 ms |     2895.642 ms |      10.423 ms
-----------------------------------------------------------------------------------------------------------

### Sorted Array

Results for Sorting Algorithm Performance Analysis on [Sorted Array]
-----------------------------------------------------------------------------------------------------------
Array Length | QuickSortPF Time | QuickSortPL Time | QuickSortRP Time | BubbleSort Time | MergeSort Time
-----------------------------------------------------------------------------------------------------------
           2 |         0.002 ms |         0.000 ms |         0.001 ms |        0.000 ms |       0.000 ms
           5 |         0.001 ms |         0.000 ms |         0.001 ms |        0.000 ms |       0.001 ms
          10 |         0.001 ms |         0.000 ms |         0.002 ms |        0.000 ms |       0.002 ms
          20 |         0.001 ms |         0.001 ms |         0.004 ms |        0.000 ms |       0.003 ms
          50 |         0.003 ms |         0.002 ms |         0.009 ms |        0.000 ms |       0.009 ms
         200 |         0.020 ms |         0.025 ms |         0.038 ms |        0.000 ms |       0.034 ms
         500 |         0.129 ms |         0.151 ms |         0.099 ms |        0.001 ms |       0.091 ms
        2500 |         2.099 ms |         3.422 ms |         0.492 ms |        0.003 ms |       0.442 ms
        9000 |        26.342 ms |        44.357 ms |         1.768 ms |        0.013 ms |       2.200 ms
       20000 |       128.692 ms |       204.984 ms |         3.851 ms |        0.057 ms |       3.705 ms
       40000 |       515.307 ms |       745.448 ms |         7.852 ms |        0.131 ms |       7.657 ms
-----------------------------------------------------------------------------------------------------------

### Reversed Array

Results for Sorting Algorithm Performance Analysis on [Reversed Array]
-----------------------------------------------------------------------------------------------------------
Array Length | QuickSortPF Time | QuickSortPL Time | QuickSortRP Time | BubbleSort Time | MergeSort Time
-----------------------------------------------------------------------------------------------------------
           2 |         0.001 ms |         0.000 ms |         0.001 ms |        0.000 ms |       0.001 ms
           5 |         0.000 ms |         0.000 ms |         0.002 ms |        0.000 ms |       0.001 ms
          10 |         0.001 ms |         0.001 ms |         0.002 ms |        0.001 ms |       0.002 ms
          20 |         0.001 ms |         0.001 ms |         0.005 ms |        0.001 ms |       0.004 ms
          50 |         0.002 ms |         0.002 ms |         0.011 ms |        0.004 ms |       0.009 ms
         200 |         0.023 ms |         0.024 ms |         0.041 ms |        0.054 ms |       0.038 ms
         500 |         0.126 ms |         0.135 ms |         0.100 ms |        0.347 ms |       0.095 ms
        2500 |         2.789 ms |         3.054 ms |         0.487 ms |        7.774 ms |       0.467 ms
        9000 |        35.324 ms |        39.319 ms |         1.884 ms |      100.119 ms |       1.816 ms
       20000 |       171.936 ms |       187.370 ms |         3.988 ms |      496.658 ms |       3.788 ms
       40000 |       662.144 ms |       727.156 ms |         8.124 ms |     1972.706 ms |       8.792 ms
-----------------------------------------------------------------------------------------------------------


## Quick Sort & Merge Sort vs Bubble Sort

- The worst-case time complexity of Bubble Sort is O(n^2). Execution times generally scale very fast with the dataset size growth.
- In the average and best cases, Quicksort has an average time complexity of O(n log n). Even in the worst case (unbalanced partitions), the time complexity is O(n^2). Execution times generally scale moderately fast with the dataset size growth.
- Mergesort has a consistent time complexity of O(n log n) regardless of the input data's initial order. Execution times generally scale moderately fast with the dataset size growth.


## Conclusion

- Bubble Sort is inefficient for larger datasets and most array types, it is only good for mostly Sorted Arrays. Performance noticeably degrades past 50-element arrays, compared to Quick Sort and Merge Sort.
- Quicksort performs very well on Random arrays, but lacks consistency. Pivot First and Last variant degrade significantly on Sorted and Reversed Arrays. Execution times are volatile, but Random Pivot version is very good on average.
- Mergesort consistently performs well regardless of array type and size.

