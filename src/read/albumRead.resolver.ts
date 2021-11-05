import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Album, Musician, Song } from "src/read/graphql/graphql.schema";
import { ReadService } from "./read.service";

@Resolver(() => Album)
export class AlbumRead {
	constructor(private readonly readService: ReadService) {}

	@Query(() => [Album])
	async readAllAlbum() {
		return this.readService.readAllAlbum();
	}

	@Query(() => [Album])
	async readAlbum(@Args("id") id: string) {
		return this.readService.readAlbum(id);
	}

	@ResolveField(() => [Song])
	song(@Parent() album: Album) {
		return this.readService.readContainSong(album);
	}

	@ResolveField(() => [Musician])
	musician(@Parent() album: Album) {
		return this.readService.readContainHaveSong(album);
	}
}
