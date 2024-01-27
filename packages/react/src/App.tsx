import { Avatar } from "../lib/components/Avatar";
import { Button } from "../lib/components/Button";
import { Link } from "../lib/components/Link";
import { Image } from "../lib/components/Image";
import { Lorem } from "../lib/components/Lorem";
import { H1, H2, H3, H4, H5, H6 } from "../lib/components/Heading";
import { P } from "../lib/components/Paragraph";
import { Flex, Grid } from "../lib/components/Display";
import { Video } from "../lib/components/Video";

export default function App() {
    return (
        <>
            <header>
                <Flex justifyContent="space-between" alignItems="center" gap={10}>
                    <Image width={150} height={60} />
                    <Flex alignItems="center" gap={10}>
                        <P>User</P>
                        <Avatar size={32} />
                    </Flex>
                </Flex>
            </header>
            <main>
                <H1><Lorem /></H1>
                <H2><Lorem /></H2>
                <H3><Lorem /></H3>
                <H4><Lorem /></H4>
                <H5><Lorem /></H5>
                <H6><Lorem /></H6>
                <P><Lorem /></P>
                <Link />
                <Flex gap={8}>
                    <Button />
                    <Button
                        backgroundColor="black"
                        color="white"
                    />
                </Flex>
                <Flex
                    gap={4}
                    justifyContent="space-around"
                >
                    <Grid justifyItems="center" gap={12}>
                        <Image width={"100%"} aspectRatio={16 / 9} />
                        <P textAlign="center"><Lorem /></P>
                        <Button />
                    </Grid>
                    <Grid justifyItems="center" gap={12}>
                        <Image width={"100%"} aspectRatio={16 / 9} />
                        <P textAlign="center"><Lorem /></P>
                        <Button />
                    </Grid>
                    <Grid justifyItems="center" gap={12}>
                        <Image width={"100%"} aspectRatio={16 / 9} />
                        <P textAlign="center"><Lorem /></P>
                        <Button />
                    </Grid>
                </Flex>
                <Video />
            </main>
            <footer>
                <Flex gap={8}>
                    <Link />
                    <Link />
                    <Link />
                </Flex>
            </footer>
        </>
    );
}