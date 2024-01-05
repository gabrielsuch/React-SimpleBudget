import { Box, Skeleton, SkeletonProps } from "@chakra-ui/react";

interface CardSkeletonProps extends SkeletonProps {
  repeatCount: number;
}

export const CardSkeleton = ({
  repeatCount = 1,
  ...rest
}: CardSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <>
      {howMany.map((_) => (
        <Skeleton
          key={_}
          {...rest}
          speed={1}
          m="3"
          startColor="gray.100"
          endColor="gray.200"
        >
          <Box
            // w={["340px", "400px", "400px", "450px"]}
            // h={["245px", "215px", "215px", "245px"]}
            // bg="gray.300"
            //padding="7"
          />
        </Skeleton>
      ))}
    </>
  );
};
